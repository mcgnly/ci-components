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
}
