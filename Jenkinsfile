pipeline {

    agent any

    environment {
        IMAGE_NAME = "react-example"
        CONTAINER_NAME = "react-app"
    }

    stages {

        stage('Docker Debug') {
    steps {
        sh '''
        echo "Current User:"
        whoami

        echo
        echo "Groups:"
        id

        echo
        echo "Docker Socket:"
        ls -l /var/run/docker.sock

        echo
        echo "Docker Version:"
        docker --version

        echo
        echo "Docker PS:"
        docker ps
        '''
    }
}

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker rm -f ${CONTAINER_NAME} || true

                docker run -d \
                    --name ${CONTAINER_NAME} \
                    -p 80:80 \
                    ${IMAGE_NAME}:latest
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment Successful"
        }

        failure {
            echo "Deployment Failed"
        }
    }
}