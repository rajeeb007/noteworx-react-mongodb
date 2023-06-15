pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker_key')
    }
    stages {
        stage('git checkout') {
            steps{
                git credentialsId: 'git_key', url: 'https://github.com/rajeeb007/noteworx-react-mongodb.git'
            }
        }
    }

}