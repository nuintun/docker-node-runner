# 定义构建参数
# NODE_VERSION，默认值为 alpine
ARG NODE_VERSION=alpine
# HOST_TIMEZONE 默认值为 Asia/Shanghai
ARG HOST_TIMEZONE=Asia/Shanghai

# 使用指定的 Node.js Alpine 镜像作为基础镜像
FROM node:${NODE_VERSION}

# 配置工作目录
WORKDIR /wwwroot

# 配置 Node 运行模式
ENV NODE_ENV=production

# 安装时区依赖并配置时区
RUN apk add --no-cache bash tzdata \
&& cp /usr/share/zoneinfo/${HOST_TIMEZONE} /etc/localtime \
&& echo "${HOST_TIMEZONE}" > /etc/timezone

# 显示实际安装 Node 版本
RUN node -v

# 配置默认端口
EXPOSE 8080

# 运行项目
CMD ["npm", "start"]
