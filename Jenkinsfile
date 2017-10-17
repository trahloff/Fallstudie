pipeline {
    agent { label 'taas-swarm-lon02' }
    stages {

      /* ------------------------------------------------- */
        stage("Build") {
            agent { docker { image 'node:latest' } }
            steps {
              sh 'yarn'
             }
        }

      /* ------------------------------------------------- */
        stage("Test") {
            agent { docker { image 'node:latest' } }
            steps {
              sh 'yarn test'
             }
        }

      /* ------------------------------------------------- */
        stage("Build & Push Docker Image") {
            agent { docker { image 'docker:latest' } }
            steps {
              sh "docker build -t trahloff/testapi:latest -t trahloff/testapi:1.1.8 ."
             }
        }

    }
}
