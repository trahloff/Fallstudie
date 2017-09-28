pipeline {
    agent none

    stages {
        stage('Build') {
          agent { docker 'maven:3-alpine' }
          steps {
              echo 'Hello, Maven'
              sh 'mvn --version'
          }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
