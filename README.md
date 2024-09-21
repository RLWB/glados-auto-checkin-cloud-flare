# GLaDOS Auto Check-in Cloudflare Worker

![GLaDOS](https://img.shields.io/badge/GLaDOS-Auto%20Check--in-blue)
![Cloudflare Worker](https://img.shields.io/badge/Cloudflare-Worker-orange)
![Telegram Bot](https://img.shields.io/badge/Telegram-Bot-blue)

Keywords: GLaDOS, Auto Check-in, Cloudflare Worker, Telegram Bot, Scheduled Tasks, Network Acceleration, VPN Service

[中文说明](#glados-自动签到-cloudflare-worker)

## Introduction

This is a GLaDOS auto check-in tool implemented using Cloudflare Worker. It helps you automatically complete daily check-ins for GLaDOS and sends check-in result notifications via Telegram bot.

Main features:

- Automatic daily check-in for GLaDOS
- Retrieve user account status (remaining days)
- Send check-in result notifications via Telegram
- Support for scheduled and manual check-in triggers

## Usage

The Worker can be triggered in two ways:

1. Scheduled trigger:
   The Worker automatically executes the check-in task based on the set cron expression. By default, it's set to run at 12:00 and 19:06 (UTC+8) every day.

2. Manual trigger:
   You can manually trigger the check-in by accessing the `/trigger-checkin` path of the Worker.

After check-in, you will receive a notification in the specified Telegram chat containing the following information:

- Check-in date
- Check-in result
- Points earned
- Current account balance
- Remaining days for the account

## Preparation

### 1. Register a Cloudflare account

1. Visit the [Cloudflare website](https://www.cloudflare.com/)
2. Click "Sign Up" to register a new account
3. Complete email verification and account setup

### 2. Obtain GLaDOS related information

1. Log in to the [GLaDOS website](https://glados.rocks/)
2. Open browser developer tools (F12)
3. Switch to the "Network" tab
4. Refresh the page and find any request
5. In the request headers, find the "Cookie" field and copy its value as `GLADOS_COOKIE`
6. In the request headers, find the "Authorization" field and copy its value as `GLADOS_TOKEN`
7. In the request headers, find the "User-Agent" field and copy its value as `GLADOS_USER_AGENT`

### 3. Create a Telegram bot and obtain related information

1. Search for "@BotFather" in Telegram and start a conversation
2. Send the "/newbot" command to create a new bot
3. Follow the prompts to set the bot name and username
4. Get the API Token (like `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`), this is your `TELEGRAM_BOT_TOKEN`
5. Add the bot to the group or channel where you want to receive notifications
6. Visit `https://api.telegram.org/bot<YourBOTToken>/getUpdates` to get the chat_id
7. In the returned JSON, find the "chat" object, the value of the "id" field is your `TELEGRAM_CHAT_ID`

## Installation

1. Clone this repository:

   ```
   git clone https://github.com/RLWB/glados-auto-checkin-cloud-flare.git
   cd glados-auto-checkin-cloudflare
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Copy `wrangler.toml.example` to `wrangler.toml` and fill in your configuration information:

   ```
   cp wrangler.toml.example wrangler.toml
   ```

4. Edit the `wrangler.toml` file, enter your GLaDOS and Telegram related information:
   ```toml
   [vars]
   GLADOS_COOKIE = "Your GLaDOS Cookie"
   GLADOS_TOKEN = "Your GLaDOS Token"
   GLADOS_USER_AGENT = "Your User Agent"
   TELEGRAM_BOT_TOKEN = "Your Telegram Bot Token"
   TELEGRAM_CHAT_ID = "Your Telegram Chat ID"
   ```

## Deployment

1. Log in to your Cloudflare account:

   ```
   npx wrangler login
   ```

2. Deploy the Worker:

   ```
   npm run deploy
   ```

3. (Optional) If you want to test the Worker locally:
   ```
   npm run dev
   ```

## Notes

- Make sure your GLaDOS Cookie and Token are valid and update them regularly.
- Protect your `wrangler.toml` file and do not share it publicly as it contains sensitive information.
- You can adjust the cron expression in the `wrangler.toml` file to change the scheduled trigger time.

## Contribution

Issues and Pull Requests are welcome to improve this project!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

# GLaDOS 自动签到 Cloudflare Worker

[English Description](#glados-auto-check-in-cloudflare-worker)

# GLaDOS 自动签到 Cloudflare Worker

![GLaDOS](https://img.shields.io/badge/GLaDOS-自动签到-blue)
![Cloudflare Worker](https://img.shields.io/badge/Cloudflare-Worker-orange)
![Telegram Bot](https://img.shields.io/badge/Telegram-Bot-blue)

关键词: GLaDOS, 自动签到, Cloudflare Worker, Telegram Bot, 定时任务, 网络加速, 机场

## 介绍

这是一个使用 Cloudflare Worker 实现的 GLaDOS 自动签到工具。它可以帮助您自动完成 GLaDOS 的每日签到,并通过 Telegram 机器人发送签到结果通知。

主要功能:

- 自动执行 GLaDOS 每日签到
- 获取用户账户状态(剩余天数)
- 通过 Telegram 发送签到结果通知
- 支持定时触发和手动触发签到

## 使用

该 Worker 有两种触发方式:

1. 定时触发:
   Worker 会根据设定的 cron 表达式自动执行签到任务。默认设置为每天 12:00 和 19:06 (UTC+8) 执行。

2. 手动触发:
   您可以通过访问 Worker 的 `/trigger-checkin` 路径来手动触发签到。

签到后,您将在指定的 Telegram 聊天中收到包含以下信息的通知:

- 签到日期
- 签到结果
- 获得的积分
- 当前账户余额
- 账户剩余天数

## 准备工作

### 1. 注册 Cloudflare 账户

1. 访问 [Cloudflare 官网](https://www.cloudflare.com/)
2. 点击 "Sign Up" 注册新账户
3. 完成邮箱验证和账户设置

### 2. 获取 GLaDOS 相关信息

1. 登录 [GLaDOS 官网](https://glados.rocks/)
2. 打开浏览器开发者工具 (F12)
3. 切换到 "Network" 标签
4. 刷新页面,找到任意一个请求
5. 在请求头中找到 "Cookie" 字段,复制其值作为 `GLADOS_COOKIE`
6. 在请求头中找到 "Authorization" 字段,复制其值作为 `GLADOS_TOKEN`
7. 在请求头中找到 "User-Agent" 字段,复制其值作为 `GLADOS_USER_AGENT`

### 3. 创建 Telegram 机器人并获取相关信息

1. 在 Telegram 中搜索 "@BotFather" 并开始对话
2. 发送 "/newbot" 命令创建新机器人
3. 按照提示设置机器人名称和用户名
4. 获取 API Token (形如 `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`),这就是 `TELEGRAM_BOT_TOKEN`
5. 将机器人添加到您想接收通知的群组或频道中
6. 访问 `https://api.telegram.org/bot<YourBOTToken>/getUpdates` 获取 chat_id
7. 在返回的 JSON 中找到 "chat" 对象,其中的 "id" 字段值就是 `TELEGRAM_CHAT_ID`

## 安装

1. 克隆此仓库:

   ```
   git clone https://github.com/RLWB/glados-auto-checkin-cloud-flare.git
   cd glados-auto-checkin-cloudflare
   ```

2. 安装依赖:

   ```
   npm install
   ```

3. 复制 `wrangler.toml.example` 为 `wrangler.toml`,并填写您的配置信息:

   ```
   cp wrangler.toml.example wrangler.toml
   ```

4. 编辑 `wrangler.toml` 文件,填入您的 GLaDOS 和 Telegram 相关信息:
   ```toml
   [vars]
   GLADOS_COOKIE = "您的GLaDOS Cookie"
   GLADOS_TOKEN = "您的GLaDOS Token"
   GLADOS_USER_AGENT = "您的User Agent"
   TELEGRAM_BOT_TOKEN = "您的Telegram机器人Token"
   TELEGRAM_CHAT_ID = "您的Telegram聊天ID"
   ```

## 部署

1. 登录到您的 Cloudflare 账户:

   ```
   npx wrangler login
   ```

2. 部署 Worker:

   ```
   npm run deploy
   ```

3. (可选) 如果您想在本地测试 Worker:
   ```
   npm run dev
   ```

## 注意事项

- 请确保您的 GLaDOS Cookie 和 Token 是有效的,并定期更新。
- 保护好您的 `wrangler.toml` 文件,不要将其公开分享,因为它包含敏感信息。
- 您可以在 `wrangler.toml` 文件中调整 cron 表达式来更改定时触发的时间。

## 贡献

欢迎提交 Issues 和 Pull Requests 来改进这个项目!

## 许可

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。
