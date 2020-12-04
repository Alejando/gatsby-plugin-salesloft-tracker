# Install website integration

First install systemd scripts

```
mkdir -p ~/.config/systemd/user/
cp deploy/systemd/website_integration.service ~/.config/systemd/user/

systemctl --user enable ~/.config/systemd/user/website_integration.service

systemctl --user daemon-reload
```

Start the service
```
systemctl --user start website_integration.service
```

check the logs

```
journalctl --user -f
```
