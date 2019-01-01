#!/usr/bin/env bash

set -e

wget -q ${HELM_URL}/${HELM_TGZ}
tar xzfv ${HELM_TGZ}
sudo mv linux-amd64/helm /usr/local/bin/helm
PATH=`pwd`/linux-amd64/:$PATH
helm version -c
helm init --client-only
rm -r linux-amd64
