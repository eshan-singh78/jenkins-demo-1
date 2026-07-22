pipeline {

    agent any

    stages{
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