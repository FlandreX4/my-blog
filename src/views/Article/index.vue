<template>
    <PageHeader>文章详细</PageHeader>
    <div class="article">
        <Card class="article-card">
            <v-md-preview ref="articleRef" :text="article"></v-md-preview>

            <div class="copyright">
                <ul>
                    <li></li>
                </ul>
            </div>
        </Card>
        <div class="sidebar">
            <div class="sidebar-container">
                <Catalog v-if="articleLoaded" :domRef="articleRef" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Card from '@/components/Card.vue';
import PageHeader from '@/components/PageHeader.vue';
import { onMounted, ref } from 'vue';
import { getArticleByName } from "@/api/article";
import Catalog from '@/components/Catalog/index.vue'

let article = ref("");
const articleRef = ref();
const articleLoaded = ref(false);

onMounted(() => {

    getArticleByName("hello-halo").then(({ data }) => {
        console.log('res:', data)
        article.value = data.data.originalContent;
        // article.value = "## 1. 服务器配置\n\n1. 2 核 4G（使用 ES 搜索策略）\n2. 2 核 2G（使用 MySQL 搜素策略，关闭 ES、Canal）\n\n## 2. CentOS 安装 Docker\n\n官方网站上有各种环境下的 [安装指南](https://docs.docker.com/install/)，这里主要介绍 Docker CE 在 CentOS 上的安装。\n\n### 2.1 卸载（可选）\n\n如果之前安装过旧版本的 Docker，可以使用下面命令卸载：\n\n```shell\nyum remove docker \\\n                  docker-client \\\n                  docker-client-latest \\\n                  docker-common \\\n                  docker-latest \\\n                  docker-latest-logrotate \\\n                  docker-logrotate \\\n                  docker-engine\n```\n\n### 2.2 安装 Docker\n\n1. 安装 yum 工具\n\n   ```shell\n   yum install -y yum-utils\n   ```\n\n2. 设置镜像仓库\n\n   ```shell\n   yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo\n   ```\n\n3. 更新 yum 软件包索引\n\n   ```shell\n   yum makecache fast\n   ```\n\n4. 安装 Docker CE\n\n   ```shell\n   yum install docker-ce docker-ce-cli containerd.io\n   ```\n\n### 2.3 启动 Docker\n\n1. 启动 Docker\n\n   ```shell\n   systemctl start docker\n   ```\n\n2. 查看 Docker 版本\n\n   ```shell\n   docker version\n   ```\n\n## 3. CentOS 安装 DockerCompose\n\n### 3.1 安装 DockerCompose\n\n```shell\ncurl -L \"https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)\" -o /usr/local/bin/docker-compose\n```\n\n> 如果下载速度较慢或者下载失败，去[Release 1.29.2 · docker/compose (github.com)](https://github.com/docker/compose/releases/tag/1.29.2)选择相应版本，下载 docker-compose-Linux-x86_64 到本地，更名为`docker-compose`，上传到服务器的`/usr/local/bin`目录下\n\n### 3.2 修改文件权限\n\n```shell\nchmod +x /usr/local/bin/docker-compose\n```\n\n## 4.数据卷挂载 Canal\n\n1. 拉取 canal 镜像\n\n   ```shell\n   docker pull canal/canal-server:latest\n   ```\n\n2. 启动 canal 镜像\n\n   ```shell\n   docker run --name canal -d canal/canal-server:latest\n   ```\n\n3. 创建映射文件\n\n   ```shell\n   mkdir /usr/local/canal\n   cd /usr/local/canal\n   touch canal.properties instance.properties\n   ```\n\n4. 将容器内的配置文件复制到刚创建好的文件里\n\n   ```shell\n   docker cp canal:/home/admin/canal-server/conf/canal.properties /usr/local/canal/canal.properties\n\n   docker cp canal:/home/admin/canal-server/conf/example/instance.properties /usr/local/canal/instance.properties\n   ```\n\n5. 关闭容器并移除容器\n\n   ```shell\n   docker stop canal\n   docker rm canal\n   ```\n\n6. 修改外部配置文件 instance.properties\n\n   ![](https://static.ttkwsd.top/article/c9054133278adf8e3a130158c1088e3f.png) ![](https://static.ttkwsd.top/article/2ce6cb4bfa0f51b5ba5364f9e94a3bb2.png)\n\n7. 修改外部配置文件 canal.properties\n\n   > 找到以下这行将`tcp`改成`rabbitMQ`\n\n   ```properties\n   # tcp, kafka, rocketMQ, rabbitMQ, pulsarMQ\n   canal.serverMode = rabbitMQ\n   ```\n\n   > 接着找到以下这几行\n\n   ```properties\n   ##################################################\n   ######### \t\t    RabbitMQ\t     #############\n   ##################################################\n   rabbitmq.host = 你的ip\n   rabbitmq.virtual.host = /\n   rabbitmq.exchange = article.topic # 交换机名称\n   rabbitmq.username = rabbitmq用户名\n   rabbitmq.password = rabbitmq密码\n   rabbitmq.deliveryMode = topic # exchange的模式\n   ```\n\n## 5. 添加 Kibana 配置文件\n\n1. 复制以下配置\n\n   ```shell\n   server.host: \"0.0.0.0\"\n   server.shutdownTimeout: \"5s\"\n   elasticsearch.hosts: [ \"http://elasticsearch:9200\" ]\n   elasticsearch.username: \"elastic\"\n   elasticsearch.password: \"密码跟elasticsearch一样\"\n   monitoring.ui.container.elasticsearch.enabled: true\n   ```\n\n2. 创建 kibana.yml\n\n   ```shell\n   mkdir /usr/local/kibana\n   vim kibana.yml\n   ```\n\n3. 将刚才复制的配置信息黏贴到 kibana.yml 中，按`Esc`键退出，再输入`:wq`保存退出\n\n## 6. nginx 配置 https\n\n1. 先去腾讯云或者阿里云申请免费 SSL 证书，然后选择 Nginx 服务器类型下载\n\n   ![](https://static.ttkwsd.top/article/e3edda8de1eea93b86556c39d116a256.png)\n\n2. 证书下载之后上传到`/etc/ssl/certs`目录下\n\n3. 在`/usr/local`目录下新建`nginx`文件夹\n\n   ```shell\n   cd /usr/local\n   mkdir nginx\n   ```\n\n4. 创建目录`/usr/local/upload`作为本地文件存储路径\n\n5. 将以下的`nginx.conf`改好后上传到`/usr/local/nginx`下\n\n   ```shell\n   events {\n       worker_connections  1024;\n   }\n\n   http {\n\n       include       mime.types;\n       default_type  application/octet-stream;\n       sendfile        on;\n       keepalive_timeout  65;\n\n       client_max_body_size     50m;\n       client_body_buffer_size  10m;\n       client_header_timeout    1m;\n       client_body_timeout      1m;\n\n       gzip on;\n       gzip_min_length  1k;\n       gzip_buffers     4 16k;\n       gzip_comp_level  4;\n       gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;\n       gzip_vary on;\n\n   server {\n           listen  443 ssl;\n           server_name  前台域名;\n\n           ssl_certificate    /etc/ssl/certs/xxxxxxxxxxxx.pem;\n           ssl_certificate_key  /etc/ssl/certs/xxxxxxxxxxxx.key;\n           ssl_session_timeout 5m;\n           ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;\n           ssl_protocols TLSv1 TLSv1.1 TLSv1.2;\n           ssl_prefer_server_ciphers on;\n\n          location / {\n               root   /usr/local/vue/blog;\n               index  index.html index.htm;\n               try_files $uri $uri/ /index.html;\n           }\n\n           location ^~ /api/ {\n               proxy_pass http://你的ip:8080/;\n               proxy_set_header   Host             $host;\n               proxy_set_header   X-Real-IP        $remote_addr;\n               proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;\n           }\n\n       }\n\n   server {\n           listen  443 ssl;\n           server_name  后台域名;\n\n           ssl_certificate    /etc/ssl/certs/xxxxxxxxxxxx.pem;\n           ssl_certificate_key  /etc/ssl/certs/xxxxxxxxxxxx.key;\n           ssl_session_timeout 5m;\n           ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;\n           ssl_protocols TLSv1 TLSv1.1 TLSv1.2;\n           ssl_prefer_server_ciphers on;\n\n          location / {\n               root   /usr/local/vue/admin;\n               index  index.html index.htm;\n               try_files $uri $uri/ /index.html;\n           }\n\n           location ^~ /api/ {\n               proxy_pass http://你的ip:8080/;\n               proxy_set_header   Host             $host;\n               proxy_set_header   X-Real-IP        $remote_addr;\n               proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;\n           }\n\n       }\n\n   server {\n        listen  443 ssl;\n        server_name  聊天室域名;\n\n        ssl_certificate    /etc/ssl/certs/xxxxxxxxxxxx.pem;\n        ssl_certificate_key  /etc/ssl/certs/xxxxxxxxxxxx.key;\n\n        location /websocket {\n            proxy_pass http://你的ip:8080;\n            proxy_http_version 1.1;\n            proxy_set_header   Upgrade     $http_upgrade;\n            proxy_set_header   Connection  \"Upgrade\";\n            proxy_set_header   X-Real-IP   $remote_addr;\n        }\n\n    }\n\n\n   server {\n           listen  443 ssl;\n\n           add_header 'Access-Control-Allow-Origin' 'https://www.ttkwsd.top';\n           add_header 'Access-Control-Allow-Methods' *;\n           server_name  文件上传域名;\n           ssl_certificate    /etc/ssl/certs/xxxxxxxxxxxx.pem;\n           ssl_certificate_key  /etc/ssl/certs/xxxxxxxxxxxx.key;\n           ssl_session_timeout 5m;\n           ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;\n           ssl_protocols TLSv1 TLSv1.1 TLSv1.2;\n           ssl_prefer_server_ciphers on;\n\n           location / {\n             root /usr/local/upload/;\n           }\n\n       }\n\n   server {\n           listen       80;\n           server_name  前台域名;\n\n           rewrite ^(.*)$\thttps://$host$1\tpermanent;\n\n       }\n\n   server {\n           listen       80;\n           server_name  后台域名;\n\n           rewrite ^(.*)$\thttps://$host$1\tpermanent;\n\n       }\n\n   server {\n           listen       80;\n           server_name  文件上传域名;\n\n           rewrite ^(.*)$\thttps://$host$1\tpermanent;\n\n       }\n\n   }\n   ```\n\n## 7. 打包前端\n\n1. `npm install`\n\n2. 修改`shoka-admin`和`shoka-blog`的 utils 文件下的 token.ts，将 domain 改成自己的所在域\n\n3. 接着修改前端的`vite.config.ts`代理地址，改成自己的 ip\n\n4. 申请了 Gitee 和 Github 的第三方登录，记得修改前端的应用 id 和回调地址\n\n![](https://static.ttkwsd.top/article/3564e1ce1a8621bc04b8a38beb6a1278.png)\n\n5. `npm run build`\n\n6. 打包之后将博客前台和后台的`dist`分别重命名为`blog`和`admin`，然后上传到服务器的`/usr/local/vue`目录下（没有就创建）\n\n![](https://static.ttkwsd.top/article/f175e72749ed8b8c22975dee0e432254.png)\n\n## 8. 打包后端\n\n1. 修改`application.yml`信息后，执行 maven 的 package 命令选择 jar 方式打包\n\n![](https://static.ttkwsd.top/article/5f8b43d347425098e8d5a8a55d0f5218.png)\n\n2. 在服务器创建`/usr/local/docker`目录，并将`target`中的 jar 包上传到该目录\n3. 修改`deploy`文件夹中的`.env`配置文件中的信息，一定确认`docker-compose.yml`中挂载的目录和文件是否存在\n4. 将`deploy`文件夹中的文件上传到`/usr/local/docker`目录中\n\n![](https://static.ttkwsd.top/article/9eb54ea259769f45c374309a27b95cec.png)\n\n## 9. 执行 sh 脚本\n\n**服务器的防火墙端口一定要放开**\n\n```shell\ncd /usr/local/docker\nsh blog-start.sh\n```\n\n项目就部署完成了，用`docker ps`查看正在运行的容器。\n\n![](https://static.ttkwsd.top/article/40728f0289f3618d49b11d29387b4133.png)\n\n## 10. 创建 ES 索引\n\n### 10.1 安装 ik 分词器\n\n```shell\n# 进入容器\ndocker exec -it elasticsearch /bin/bash\n# 安装ik分词器\n./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.3/elasticsearch-analysis-ik-7.17.3.zip\n# 退出容器\nexit\n# 重启容器\ndocker restart elasticsearch\n```\n\n### 10.2 创建 ES 索引\n\n在浏览器窗口输入`你的ip:5601`，然后用密码登录 kibana（用户名是 elastic），复制`mapping.json`文件中的代码黏贴到`Dev Tools`\n\n![](https://static.ttkwsd.top/article/0c79a7a4a0c2eec461291d5ad3956a91.png)\n\n执行成功状态为 200，可以执行`GET /article`查看是否创建成功\n\nkibana 不用的话，一定要关掉（好像带不动），需要的时候再启动就行了。\n\n## 11. 最后\n\n有什么问题的话，可以在下方评论区评论。不方便评论的话，可以加我联系方式私聊。写的不对的地方欢迎大家在评论区指出\n";
        articleLoaded.value = true;
    })

});





</script>

<style lang='less' scoped>
.article {
    display: flex;
    width: 60%;
    margin: 100px auto;
    position: relative;
    z-index: 1;
}

.article-card {
    width: calc(~"100% - 290px");
    padding: initial;
}

.sidebar {
    width: 290px;
}

.sidebar-container {
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 0 16px rgba(0, 0, 0, .1);
    transition: all .2s ease-in-out 0s;
    position: sticky;
    top: 90px;
    margin-left: 13px;
    animation: slideUpIn 1s;
    background-color: white;
}

.copyright {
    font-size: 9px;
    padding: 16px 32px;
    margin-bottom: 40px;
    border-radius: 10px;
    background: #f7f7f7;
    color: #666;

}
</style>