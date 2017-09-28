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


// ERROR:
// [trahloff_Fallstudie_master---] Running shell script
// + docker pull maven:3-alpine
// /var/jenkins_home/workspace/trahloff_Fallstudie_master---@tmp/durable-cc51ceb3/script.sh: 2:
// /var/jenkins_home/workspace/trahloff_Fallstudie_master---@tmp/durable-cc51ceb3/script.sh: docker: not found
