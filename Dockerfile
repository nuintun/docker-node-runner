# NODE_VERSION，默认值为 alpine
ARG NODE_VERSION=alpine

# 使用指定的 Node 镜像版本进行构建
FROM node:${NODE_VERSION}

# HOST_TIMEZONE 默认值为 Asia/Shanghai
ARG HOST_TIMEZONE=Asia/Shanghai

# 配置环境变量
ENV TZ=${HOST_TIMEZONE} \
NODE_ENV=production

# 安装时区依赖并配置时区
RUN apk add --no-cache bash tzdata \
&& cp /usr/share/zoneinfo/${HOST_TIMEZONE} /etc/localtime \
&& echo "${HOST_TIMEZONE}" > /etc/timezone
&& echo "Node: $(node -v)"

# 配置工作目录
WORKDIR /wwwroot

# 配置默认端口
EXPOSE 8080

# 运行项目
CMD ["npm", "start"]
