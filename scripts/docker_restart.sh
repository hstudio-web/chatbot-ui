#!/bin/bash

docker rm -f 51prompt-front
docker rmi registry.cn-beijing.aliyuncs.com/hcloud_loverain/51prompt:v1.0.0
docker run -d  --net=host -e http_proxy=http://127.0.0.1:8118 -e https_proxy=http://127.0.0.1:8118 --name 51prompt-front registry.cn-beijing.aliyuncs.com/hcloud_loverain/51prompt:v1.0.0

docker logs -f 51prompt-front --tail=20
