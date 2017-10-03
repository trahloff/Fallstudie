// taas-swarm-lon02

pipeline {
    agent 'taas-swarm-lon02'
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
