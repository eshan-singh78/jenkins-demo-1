pipeline {

    agent any

    stages{

        stage('Debug'){
            steps{
                sh 'node -v'
                sh 'npm -v'
            }
        }
        stage('Checkout'){
            steps{
                checkout scm
            }
        }

        stage('Installing Dependencies'){
            steps{
                sh 'npm install'
            }
        }


        stage('Starting Application'){
            steps{
                sh 'npm run dev'
            }
        }
    }

    post{
        always{
            echo 'Cleaning up...'
            sh 'rm -rf node_modules'
        }
    }
}