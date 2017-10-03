// #!/usr/bin/groovy
//
// // load pipeline functions
// // Requires pipeline-github-lib plugin to load library from github
// @Library('github.com/lachie83/jenkins-pipeline@v0.1')
// def pipeline = new io.estrado.Pipeline()


pipeline {
    agent {
        node { label 'my-docker' }
    }
    stages {
        stage("Build") {
            agent {
                docker {
                reuseNode true
                image 'maven:3.5.0-jdk-8'
                }
            }
            steps {
                sh 'mvn -version'
            }
        }
    }
}
