# DeepSeek-R1 AI聊天机器人

一个功能强大、界面优雅的AI聊天应用，基于DeepSeek-R1大语言模型打造。提供流畅的对话体验、智能回复和精美的用户界面。

![DeepSeek-R1 聊天机器人](https://i.imgur.com/LkJXZvS.png)

## ✨ 特性

- 🧠 由DeepSeek-R1强大的AI模型提供支持，具备优秀的中文理解能力
- 🌊 实时流式响应，打字效果平滑自然
- 🌓 支持亮色/暗色主题切换，自动适应系统偏好
- 💬 多会话管理，轻松组织不同主题的对话
- 📱 响应式设计，完美适配各种设备屏幕
- 🔍 Markdown和代码语法高亮支持
- 📋 一键复制AI回复内容
- 🚀 简洁直观的用户界面，提供卓越用户体验

## 🛠️ 技术栈


### 后端
- Python Flask
- NVIDIA API (DeepSeek-R1 模型访问)
- 流式响应处理

### 前端
- React
- 上下文API用于状态管理
- CSS变量实现主题切换
- React Markdown用于格式化显示
- 响应式设计

## 🚀 快速开始

### 前提条件
- Node.js (v14+)
- Python (v3.8+)
- NVIDIA API密钥 (用于访问DeepSeek-R1模型)

### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/你的用户名/deepseek-r1-chatbot.git
cd deepseek-r1-chatbot
```

2. **安装后端依赖**
```bash
pip install flask flask-cors openai python-dotenv
```

3. **配置环境变量**

创建`.env`文件并添加您的API密钥：
```
NVIDIA_API_KEY=你的NVIDIA_API密钥
```

4. **安装前端依赖**
```bash
npm install
```

5. **启动后端服务**
```bash
python app.py
```

6. **启动前端开发服务器**
```bash
npm start
```

7. **访问应用**

打开浏览器，访问 [http://localhost:3000](http://localhost:3000)

## 📖 使用指南

### 基本聊天
1. 在输入框中输入您的问题或指令
2. 点击发送按钮或按Enter键
3. AI将开始生成回复，您可以看到实时打字效果

### 创建新对话
1. 点击侧边栏中的"新对话"按钮
2. 这将创建一个新的会话，您可以开始全新的对话主题

### 切换主题
- 点击侧边栏底部的主题切换按钮，可以在亮色/暗色主题之间切换

### 移动设备使用
- 在移动设备上，可以通过点击左上角菜单按钮打开/关闭侧边栏

## 🔧 API参考

### 后端API

#### 聊天请求
```
POST /api/chat
```

**请求体**:
```json
{
  "message": "用户消息内容"
}
```

**响应**:
- 流式回复，包含AI生成的文本片段

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出新功能建议！

1. Fork这个仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m '添加了一个神奇的功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [DeepSeek AI](https://deepseek.com) 提供的强大AI模型
- [React](https://reactjs.org/) 用于构建用户界面
- [Flask](https://flask.palletsprojects.com/) 提供后端支持
- 所有贡献和使用本项目的开发者

---

**注意**: 此项目仅用于学习和研究目的。请遵守DeepSeek的使用条款和API使用限制。
