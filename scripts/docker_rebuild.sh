#!/bin/bash

docker build -t registry.cn-beijing.aliyuncs.com/hcloud_loverain/51prompt:v1.0.0 .

docker push registry.cn-beijing.aliyuncs.com/hcloud_loverain/51prompt:v1.0.0
