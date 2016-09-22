node {
  env.NVM_DIR=""

    stage('Checkout') {
        checkout scm
    }

    stage('Clean') {
        sh """#!/bin/bash -e
            rm -rf build node_modules
        """
    }

    stage('Install') {
        sh """#!/bin/bash -e
            NVM_DIR=
            source ~/.nvm/nvm.sh
            nvm install 5.2.0
            nvm use 5.2.0
            npm install
        """
    }

    stage('Test') {
        sh """#!/bin/bash -e
            NVM_DIR=
            source ~/.nvm/nvm.sh
            nvm use 5.2.0
            npm run test
        """
    }

    stage('Build') {
        sh """#!/bin/bash -e
            NVM_DIR=
            source ~/.nvm/nvm.sh
            nvm use 5.2.0
            npm run build:${env.BRANCH_NAME}
        """
    }

    stage('Upload') {
        sh """#!/bin/bash -e
            export LD_LIBRARY_PATH=""
            case ${env.BRANCH_NAME} in
            "master")
            /usr/local/bin/aws s3 cp --recursive --region "eu-west-1" "dist" "s3://millio-dashboard.relayr.io/"
            ;;
            "dev")
            /usr/local/bin/aws s3 cp --recursive --region "eu-west-1" "dist" "s3://dev-millio-dashboard.relayr.io/"
            ;;
            esac

        """
    }
}
