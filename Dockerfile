# 使用官方 Node.js Alpine 镜像作为基础镜像
FROM node:22-alpine

# 配置工作目录
WORKDIR /wwwroot

# 配置 Node 运行模式
ENV NODE_ENV=production

# 安装时区依赖并配置时区
RUN apk add --no-cache tzdata \
&& cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo "Asia/Shanghai" > /etc/timezone

# 配置默认端口
EXPOSE 8080

# 运行项目
CMD ["npm", "start"]
