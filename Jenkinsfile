pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker_key')
        build_number = "${env.BUILD_ID}"
    }

    stages {
        stage('Git Checkout') {
            steps {
                git credentialsId: 'git_key', url: 'https://github.com/rajeeb007/noteworx-react-mongodb.git'
            }
        }

        stage('Docker Image Building') {
            steps {
                    sh 'docker build --no-cache -t rajeeb007/frontend1:1.${BUILD_NUMBER} .'
                    sh 'docker build --no-cache -t rajeeb007/backend1:1.${BUILD_NUMBER} ./Server/'
                
                
            }

       
        }
        stage('Login') {

            steps {

                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'

            }

        }
        stage('pushing to docker hub') {

            steps {

                sh 'docker push rajeeb007/frontend1:1.${BUILD_NUMBER}'
                sh 'docker push rajeeb007/backend1:1.${BUILD_NUMBER}'

            }

        }
        
        stage('Deploy') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig', kubeconfigFile: '/home/rajeeb/kubeconfig.yaml']) {
                    sh 'kubectl apply -f ./kubernetes/deploy1.yaml'
                }
            }
        }
    
    }
}
