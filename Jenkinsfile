pipeline {
    agent any

    environment {
        REMOTE_HOST = "13.218.88.7"
        REMOTE_USER = "ubuntu"
        REMOTE_DIR  = "/var/www/html"
    }

    stages {

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

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh """
                echo "Deploying to ${REMOTE_HOST}"

                ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "sudo mkdir -p ${REMOTE_DIR}"

                rsync -avz --delete \
                    -e "ssh -o StrictHostKeyChecking=no" \
                    dist/ \
                    ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/

                ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "sudo systemctl restart nginx"

                echo "Deployment Successful!"
                """
            }
        }
    }

    post {
        success {
            echo 'Application deployed successfully.'
        }

        failure {
            echo 'Deployment failed.'
        }
    }
}