#!/usr/bin/env bash

set -e

if [ ! -d $HOME/gcloud/google-cloud-sdk ]; then
    mkdir -p $HOME/gcloud &&
    wget https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz --directory-prefix=$HOME/gcloud &&
    cd $HOME/gcloud &&
    tar xzf google-cloud-sdk.tar.gz &&
    printf '\ny\n\ny\ny\n' | ./google-cloud-sdk/install.sh &&
    cd $TRAVIS_BUILD_DIR;
fi
sudo ln -sf $HOME/gcloud/google-cloud-sdk/bin/bq /usr/bin/bq
sudo ln -sf $HOME/gcloud/google-cloud-sdk/bin/gcloud /usr/bin/gcloud
sudo ln -sf $HOME/gcloud/google-cloud-sdk/bin/gsutil /usr/bin/gsutil
sudo ln -sf $HOME/gcloud/google-cloud-sdk/bin/git-credential-gcloud.sh /usr/bin/git-credential-gcloud.sh
# source $HOME/google-cloud-sdk/path.bash.inc
