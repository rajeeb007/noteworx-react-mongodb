pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker_key')
        build_number = "${env.BUILD_ID}"
        // kubeconfig_path = "/hom/rajeeb/kubeconfig.yaml" 
        kubeconfig_path = "/home/rajeeb/.kube/config"

    }

    stages {
        stage('Git Checkout') {
            steps {
                git credentialsId: 'git_key', url: 'https://github.com/rajeeb007/noteworx-react-mongodb.git'
            }
        }
        // stage('change'){

        //     script {

        //         def buildNumber = env.BUILD_NUMBER
        //         echo "Build Number: ${buildNumber}"
        //     }
        // }
        stage('Docker Image Building') {
            steps {
                    sh """
                        docker build -t rajeeb007/frontend1:1.${build_number} .
                        docker build -t rajeeb007/backend1:1.${build_number} ./Server/
                    """
                
            }

       
        }
        stage('Login') {

            steps {

                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'

            }

        }
        stage('pushing to docker hub') {

            steps {

                sh """ 
                    docker push rajeeb007/frontend1:1.${BUILD_NUMBER}
                    docker push rajeeb007/backend1:1.${BUILD_NUMBER}
                """

            }

        }
         stage('Changing the image tag in YAML') {

            steps {
                script {
                    sh "sed -i 's|rajeeb007/backend1:.*|rajeeb007/backend1:1.${build_number}|' ./kubernetes/deploy.yaml"
                    sh "sed -i 's|rajeeb007/frontend1:.*|rajeeb007/frontend1:1.${build_number}|' ./kubernetes/deploy1.yaml"
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh """
                    kubectl --kubeconfig=${kubeconfig_path} apply -f ./kubernetes/deploy.yaml
                    kubectl --kubeconfig=${kubeconfig_path} apply -f ./kubernetes/deploy1.yaml
                    kubectl --kubeconfig=${kubeconfig_path} apply -f ./kubernetes/service1.yaml
                    kubectl --kubeconfig=${kubeconfig_path} apply -f ./kubernetes/service2.yaml
                """
            }
        }
        
        
    
    }
}
