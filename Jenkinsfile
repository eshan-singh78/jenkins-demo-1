pipeline {

    agent any

    environment {
        BUILD_ID = "dontKillMe"
    }

    stages {

        stage('Debug') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Installing Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Starting Application') {
            steps {
                sh '''
                    export BUILD_ID=dontKillMe
                    nohup npm run dev > app.log 2>&1 &
                '''
            }
        }

    }
}