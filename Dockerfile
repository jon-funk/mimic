FROM node:23

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# CLI Tooling For GitHub Actions compatibility
# Helm
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
# OpenShift CLI (oc)
RUN curl -LO https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz && \
    tar -xvf oc.tar.gz && \
    mv oc /usr/local/bin/ && \
    rm -f oc.tar.gz
# Terraform
RUN curl -fsSL https://apt.releases.hashicorp.com/gpg | apt-key add - && \
    apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main" && \
    apt-get update && \
    apt-get install -y terraform
# jq
RUN apt-get update && apt-get install -y jq

CMD ["npm", "start"]