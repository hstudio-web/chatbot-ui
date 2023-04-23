#!/bin/bash

docker rm -f 51prompt
docker rmi registry.cn-beijing.aliyuncs.com/hcloud_loverain/51prompt:v1.0.0
docker run -d  -p 5000:3000 --name 51prompt-front registry.cn-beijing.aliyuncs.com/hcloud_loverain/51prompt:v1.0.0

docker logs -f 51prompt-front --tail=20
