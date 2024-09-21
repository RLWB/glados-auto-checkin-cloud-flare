/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	GLADOS_COOKIE: string;
	TELEGRAM_BOT_TOKEN: string;
	TELEGRAM_CHAT_ID: string;
	GLADOS_TOKEN: string;
	GLADOS_USER_AGENT: string;
}

async function checkin(cookie: string, token: string, userAgent: string): Promise<{ message: string; points: number; balance: number }> {
	try {
		const response = await fetch('https://glados.network/api/user/checkin', {
			method: 'POST',
			headers: {
				Cookie: cookie,
				Authorization: token,
				'User-Agent': userAgent,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: 'glados.one' }),
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const result = (await response.json()) as {
			message: string;
			points?: number;
			list?: [{ points: number; balance: number; change?: number }];
		};
		return {
			message: result.message,
			points: parseInt(String(result.list?.[0]?.change ?? result.list?.[0]?.points ?? result.points ?? '0')),
			balance: parseInt(String(result.list?.[0]?.balance ?? '0')),
		};
	} catch (error) {
		console.error('签到失败:', error);
		return { message: '签到过程中发生错误', points: 0, balance: 0 };
	}
}

async function getUserStatus(cookie: string, token: string, userAgent: string): Promise<{ leftDays: number }> {
	try {
		const response = await fetch('https://glados.network/api/user/status', {
			headers: {
				Cookie: cookie,
				Authorization: token,
				'User-Agent': userAgent,
			},
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const result = (await response.json()) as { data?: { leftDays?: number } };
		return { leftDays: parseInt(String(result.data?.leftDays ?? '0')) };
	} catch (error) {
		console.error('获取用户状态失败:', error);
		return { leftDays: 0 };
	}
}

async function sendTelegramMessage(botToken: string, chatId: string, message: string) {
	await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chat_id: chatId,
			text: message,
		}),
	});
}

export default {
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.log('开始执行定时任务');
		const result = await checkin(env.GLADOS_COOKIE, env.GLADOS_TOKEN, env.GLADOS_USER_AGENT);
		console.log('签到结果:', result);
		const currentDate = new Date().toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' });
		const status = await getUserStatus(env.GLADOS_COOKIE, env.GLADOS_TOKEN, env.GLADOS_USER_AGENT);
		await sendTelegramMessage(
			env.TELEGRAM_BOT_TOKEN,
			env.TELEGRAM_CHAT_ID,
			`📅 GLaDOS 签到日期: ${currentDate}\n` +
				`✅ 签到结果: ${result.message}\n` +
				`🎉 成功获取：${result.points}点\n` +
				`💰 当前余额：${result.balance}点\n` +
				`⏳ 剩余天数：${status.leftDays}天\n` +
				`🚀 继续保持，奥利给！`
		);
		return new Response('签到已触发，请检查 Telegram 消息');
	},

	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.url.includes('/trigger-checkin')) {
			console.log('手动触发签到');
			const result = await checkin(env.GLADOS_COOKIE, env.GLADOS_TOKEN, env.GLADOS_USER_AGENT);
			console.log('签到结果:', result);
			const currentDate = new Date().toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' });
			const status = await getUserStatus(env.GLADOS_COOKIE, env.GLADOS_TOKEN, env.GLADOS_USER_AGENT);
			await sendTelegramMessage(
				env.TELEGRAM_BOT_TOKEN,
				env.TELEGRAM_CHAT_ID,
				`📅 GLaDOS 签到日期: ${currentDate}\n` +
					`✅ 签到结果: ${result.message}\n` +
					`🎉 成功获取：${result.points}点\n` +
					`💰 当前余额：${result.balance}点\n` +
					`⏳ 剩余天数：${status.leftDays}天\n` +
					`🚀 继续保持，奥利给！`
			);
			return new Response('签到已触发，请检查 Telegram 消息');
		}
		return new Response('GLaDOS Auto Checkin Worker is running!');
	},
};
