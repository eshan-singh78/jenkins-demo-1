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
                sh 'nohup npm run dev > app.log 2>&1 &'
            }
        }
    }

}