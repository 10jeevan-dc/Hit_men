#!/usr/bin/env bash

set -e

gcloud auth activate-service-account --key-file "${GOOGLE_APPLICATION_CREDENTIALS}"
gcloud config set project $PROJECT_ID
gcloud config set compute/zone $ZONE
gcloud components update kubectl
mkdir ~/.kube && cd ~/.kube && echo "" > config
gcloud container clusters get-credentials $CLUSTER_NAME
