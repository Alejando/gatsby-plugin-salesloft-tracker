# Install website production

First install systemd scripts

```
mkdir -p ~/.config/systemd/user/
cp deploy/systemd/website_production.service ~/.config/systemd/user/

systemctl --user enable ~/.config/systemd/user/website_production.service

systemctl --user daemon-reload
```

Start the service
```
systemctl --user start website_production.service
```

check the logs

```
journalctl --user -f
```

# Install website staging

First install systemd scripts

```
mkdir -p ~/.config/systemd/user/
cp deploy/systemd/website_develop.service ~/.config/systemd/user/

systemctl --user enable ~/.config/systemd/user/website_develop.service

systemctl --user daemon-reload
```

Start the service
```
systemctl --user start website_develop.service
```

check the logs

```
journalctl --user -f
```

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
