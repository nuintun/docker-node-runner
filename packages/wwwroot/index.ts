/**
 * @module index
 */

import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';

const PORT = process.env.PORT || 8080;

const html = `<!doctype html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>欢迎 · Node 服务</title>
    <style>
      :root {
        --bg: #f8fafc;
        --text: #1e293b;
        --accent: #3b82f6;
        --border: #e2e8f0;
        --card-bg: #ffffff;
        --success: #22c55e;
        --text-secondary: #64748b;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        min-width: fit-content;
      }
      body {
        display: flex;
        padding: 20px;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #f0f4ff 0%, #f8fafc 50%, #f1f5f9 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      }
      .card {
        width: 100%;
        max-width: 440px;
        padding: 48px 40px;
        text-align: center;
        border-radius: 20px;
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease;
        background: var(--card-bg);
        box-shadow:
          0 8px 30px rgba(0, 0, 0, 0.06),
          0 2px 8px rgba(0, 0, 0, 0.04);
      }
      .icon {
        width: 64px;
        color: white;
        height: 64px;
        font-size: 30px;
        align-items: center;
        border-radius: 16px;
        margin-bottom: 20px;
        display: inline-flex;
        justify-content: center;
        box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      }
      h1 {
        color: #0f172a;
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 6px;
        white-space: nowrap;
        word-break: keep-all;
      }
      .status {
        gap: 6px;
        color: #166534;
        font-size: 13px;
        font-weight: 600;
        padding: 5px 16px;
        align-items: center;
        background: #f0fdf4;
        border-radius: 20px;
        margin: 14px 0 22px;
        white-space: nowrap;
        display: inline-flex;
        word-break: keep-all;
        border: 1px solid #bbf7d0;
      }
      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #22c55e;
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.6;
          transform: scale(1.2);
        }
      }
      .info {
        color: #475569;
        font-size: 14px;
        line-height: 1.8;
        padding: 18px 16px;
        background: #f8fafc;
        border-radius: 12px;
        margin-bottom: 20px;
      }
      .info-row {
        gap: 0 12px;
        display: flex;
        padding: 6px 0;
        align-items: center;
        white-space: nowrap;
        word-break: keep-all;
        justify-content: space-between;
        border-bottom: 1px dashed #e2e8f0;
      }
      .info-row:last-child {
        border-bottom: none;
      }
      .info-row .label {
        color: #94a3b8;
        font-weight: 500;
      }
      .info-row .value {
        color: #1e293b;
        font-size: 13px;
        font-weight: 600;
        font-family: 'SF Mono', 'Cascadia Code', monospace;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        }
        .card {
          background: #1e293b;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }
        h1 {
          color: #f1f5f9;
        }
        .info {
          color: #cbd5e1;
          background: #0f172a;
        }
        .info-row {
          border-color: #334155;
        }
        .info-row .value {
          color: #e2e8f0;
        }
        .status {
          color: #86efac;
          background: #14532d;
          border-color: #166534;
        }
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="icon">🚀</div>
      <h1>服务已启动</h1>
      <div class="status"><span class="status-dot"></span> 运行中</div>
      <div class="info">
        <div class="info-row">
          <span class="label">Node.js</span>
          <span class="value">${process.version}</span>
        </div>
        <div class="info-row">
          <span class="label">端口</span>
          <span class="value">${PORT}</span>
        </div>
        <div class="info-row">
          <span class="label">本地时间</span>
          <span class="value" id="time">--:--:--</span>
        </div>
      </div>
    </div>
    <script>
      function updateTime() {
        const time = document.getElementById('time');

        if (time) {
          time.textContent = new Date().toLocaleTimeString('zh-CN', {
            hour12: false
          });
        }
      }

      updateTime();
      setInterval(updateTime, 1000);
    </script>
  </body>
</html>`;

function isFaviconRequest(url: string | undefined): boolean {
  if (url == null) {
    return false;
  }

  return /^\/favicon\.ico(?:\?.*)?$/i.test(url);
}

const server = createServer((request, response) => {
  if (isFaviconRequest(request.url)) {
    response.writeHead(200, {
      'Content-Type': 'image/vnd.microsoft.icon'
    });
    createReadStream('./favicon.ico').pipe(response);
  } else {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    response.end(html);
  }
});

server.listen(PORT, () => {
  console.log(`✅ 服务器已启动：http://127.0.0.1:${PORT}`);
});
