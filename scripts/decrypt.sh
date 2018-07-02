#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
echo "*** git push ENCRYPTION_LABEL: $ENCRYPTION_LABEL"
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
echo "*** git push ENCRYPTED_KEY_VAR: $ENCRYPTED_KEY_VAR"
echo "*** git push ENCRYPTED_IV_VAR: $ENCRYPTED_IV_VAR"
echo "*** git push ENCRYPTED_KEY: $ENCRYPTED_KEY"
echo "*** git push ENCRYPTED_IV: $ENCRYPTED_IV"
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key_jschuler.enc -out deploy_key_jschuler -d
echo "*** git push after openssl"
chmod 600 deploy_key_jschuler
eval `ssh-agent -s`
ssh-add deploy_key_jschuler