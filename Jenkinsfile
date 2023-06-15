// pipeline {
//     agent any
//     environment {
//         DOCKERHUB_CREDENTIALS = credentials('docker_key')
//     }
//     stages {
//         stage('git checkout') {
//             steps{
//                 git credentialsId: 'git_key', url: 'https://github.com/rajeeb007/noteworx-react-mongodb.git'
//             }
//         }
//         stage('docker image building'){

//             steps {

//                 sh "docker build --no-cache -t rajeeb007/frontend1:1.${build_number} ."
//                 sh "docker build --no-cache -t rajeeb007/backend1:1.${build_number} ./Server/"
//             }

//         }
//          stage('Login') {

//             steps {

//                 sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'

//             }

//         }

        
//     }
        

           
    


// }
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
                    sh 'docker build -t rajeeb007/frontend1:1.${BUILD_NUMBER} ./Server'
                
                
            }

       
        }
    }
}
