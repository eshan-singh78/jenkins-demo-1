pipeline {
    agent any

    environment {
        APP_PORT = '3000'
        APP_LOG = 'app.log'
        APP_PID_FILE = 'app.pid'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                    if [ -f "$APP_PID_FILE" ]; then
                        old_pid=$(cat "$APP_PID_FILE" 2>/dev/null || true)
                        if [ -n "$old_pid" ] && kill -0 "$old_pid" 2>/dev/null; then
                            kill "$old_pid"
                        fi
                    fi

                    nohup npm run dev -- --host 0.0.0.0 --port "$APP_PORT" > "$APP_LOG" 2>&1 &
                    echo $! > "$APP_PID_FILE"
                    sleep 5
                    echo "Application started with PID: $(cat "$APP_PID_FILE")"
                    tail -n 20 "$APP_LOG"
                '''
            }
        }
    }
}