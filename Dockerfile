# NODE_VERSION，默认值为 alpine
ARG NODE_VERSION=alpine

# 使用指定的 Node 镜像版本进行构建
FROM node:${NODE_VERSION}

# HOST_TIMEZONE 默认值为 Asia/Shanghai
ARG HOST_TIMEZONE=Asia/Shanghai

# 配置环境变量
ENV TZ=${HOST_TIMEZONE} \
NODE_ENV=production \
PORT=8080

# 配置工作目录
WORKDIR /wwwroot

# 配置时区并输出 Node 版本
RUN apk add --no-cache bash tzdata \
&& cp /usr/share/zoneinfo/${TZ} /etc/localtime \
&& echo "${TZ}" > /etc/timezone \
&& echo "Node: $(node -v)"

# 配置默认端口
EXPOSE ${PORT}

# 配置运行命令
CMD ["npm", "start"]
