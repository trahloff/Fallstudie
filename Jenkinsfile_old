// taas-swarm-lon02

pipeline {
    agent none
    stages {
        stage("Build") {
            agent {
                docker {
                reuseNode true
                image 'node:latest'
                }
            }
            steps {
                sh 'node --version'
            }
        }
    }
}
