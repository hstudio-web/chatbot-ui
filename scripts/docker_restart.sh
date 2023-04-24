#!/bin/bash

docker rm -f 51prompt
docker rmi registry.cn-beijing.aliyuncs.com/hcloud_loverain/51prompt:v1.0.0
docker run -d  --net=host --name 51prompt-front registry.cn-beijing.aliyuncs.com/hcloud_loverain/51prompt:v1.0.0

docker logs -f 51prompt-front --tail=20
