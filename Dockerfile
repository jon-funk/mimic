FROM node:23

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# CLI Tooling For GitHub Actions compatibility
# Curl, jq
RUN apt-get update \
    && apt-get install -y jq curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
# Nektos Act
RUN curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | bash \
    && mv ./bin/act /usr/local/bin/act
# Helm
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
# OpenShift CLI (oc)
RUN curl -LO https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/linux/oc.tar.gz && \
    tar -xvf oc.tar.gz && \
    mv oc /usr/local/bin/ && \
    rm -f oc.tar.gz



CMD ["npm", "start"]