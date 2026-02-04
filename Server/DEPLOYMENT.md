# Deployment Guide

## Pre-deployment Checklist

### ✅ Environment Variables
- [ ] Copy `env.example` to `.env`
- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB connection string
- [ ] Set strong JWT secret
- [ ] Configure email settings
- [ ] Set Google OAuth credentials
- [ ] Set Apple Sign-In credentials
- [ ] Configure Cloudinary settings
- [ ] Set Razorpay credentials
- [ ] Update client URL for production

### ✅ Security
- [ ] Change default passwords
- [ ] Use strong JWT secret
- [ ] Enable HTTPS in production
- [ ] Configure CORS for production domain
- [ ] Set up rate limiting
- [ ] Enable security headers (Helmet.js)
- [ ] Validate all input data
- [ ] Sanitize user inputs

### ✅ Database
- [ ] MongoDB running and accessible
- [ ] Create production database
- [ ] Set up database user with limited permissions
- [ ] Enable database authentication
- [ ] Configure connection pooling
- [ ] Set up database backups
- [ ] Test database connection

### ✅ Dependencies
- [ ] Run `npm ci --only=production`
- [ ] Remove dev dependencies
- [ ] Update all packages to latest stable versions
- [ ] Check for security vulnerabilities: `npm audit`

## Production Deployment

### Option 1: PM2 (Recommended)

1. **Install PM2 globally**
   ```bash
   npm install -g pm2
   ```

2. **Start the application**
   ```bash
   pm2 start app.js --name "rental-app-server"
   ```

3. **Save PM2 configuration**
   ```bash
   pm2 save
   pm2 startup
   ```

4. **Monitor the application**
   ```bash
   pm2 monit
   pm2 logs rental-app-server
   ```

### Option 2: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   EXPOSE 4000
   CMD ["npm", "start"]
   ```

2. **Build and run**
   ```bash
   docker build -t rental-app-server .
   docker run -p 4000:4000 --env-file .env rental-app-server
   ```

### Option 3: Systemd Service

1. **Create service file** `/etc/systemd/system/rental-app.service`
   ```ini
   [Unit]
   Description=Rental App Server
   After=network.target

   [Service]
   Type=simple
   User=nodejs
   WorkingDirectory=/var/www/rental-app
   Environment=NODE_ENV=production
   ExecStart=/usr/bin/node app.js
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   ```

2. **Enable and start service**
   ```bash
   sudo systemctl enable rental-app
   sudo systemctl start rental-app
   sudo systemctl status rental-app
   ```

## Nginx Configuration

### Reverse Proxy Setup
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL Configuration (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring & Logging

### Application Monitoring
- [ ] Set up PM2 monitoring
- [ ] Configure log rotation
- [ ] Set up error tracking (Sentry)
- [ ] Monitor application performance
- [ ] Set up health check endpoints

### Server Monitoring
- [ ] Monitor CPU and memory usage
- [ ] Set up disk space monitoring
- [ ] Configure network monitoring
- [ ] Set up alerting for critical issues

### Database Monitoring
- [ ] Monitor MongoDB performance
- [ ] Set up slow query logging
- [ ] Monitor connection pool usage
- [ ] Set up database alerts

## Backup Strategy

### Database Backups
```bash
# MongoDB backup
mongodump --uri="mongodb://localhost:27017/rental_app" --out=/backup/$(date +%Y%m%d)

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backup/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="mongodb://localhost:27017/rental_app" --out="$BACKUP_DIR/$DATE"
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} \;
```

### File Backups
- [ ] Backup uploaded files (Cloudinary)
- [ ] Backup configuration files
- [ ] Backup environment variables
- [ ] Set up automated backup scheduling

## Performance Optimization

### Application Level
- [ ] Enable compression (gzip)
- [ ] Implement caching strategies
- [ ] Optimize database queries
- [ ] Use connection pooling
- [ ] Implement rate limiting

### Server Level
- [ ] Optimize Node.js settings
- [ ] Configure proper memory limits
- [ ] Set up load balancing (if needed)
- [ ] Use CDN for static assets
- [ ] Optimize server configuration

## Security Hardening

### Server Security
- [ ] Update system packages regularly
- [ ] Configure firewall rules
- [ ] Disable unnecessary services
- [ ] Use SSH key authentication
- [ ] Set up fail2ban

### Application Security
- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Implement proper authentication
- [ ] Use HTTPS everywhere
- [ ] Set security headers

## Post-deployment

### Testing
- [ ] Test all API endpoints
- [ ] Verify authentication flows
- [ ] Test file uploads
- [ ] Verify payment processing
- [ ] Test real-time features

### Monitoring
- [ ] Monitor error rates
- [ ] Check response times
- [ ] Monitor resource usage
- [ ] Set up alerting
- [ ] Review logs regularly

### Maintenance
- [ ] Schedule regular updates
- [ ] Monitor security advisories
- [ ] Backup verification
- [ ] Performance reviews
- [ ] User feedback collection

## Troubleshooting

### Common Issues
1. **Port already in use**: Check if another process is using port 4000
2. **Database connection failed**: Verify MongoDB is running and accessible
3. **Permission denied**: Check file permissions and user ownership
4. **Memory issues**: Monitor Node.js memory usage and adjust limits
5. **SSL errors**: Verify certificate configuration and renewal

### Debug Commands
```bash
# Check application status
pm2 status
pm2 logs rental-app-server

# Check system resources
htop
df -h
free -h

# Check network
netstat -tlnp
ss -tlnp

# Check logs
tail -f /var/log/nginx/error.log
journalctl -u rental-app -f
```

## Support Contacts

- **System Administrator**: [Contact Info]
- **Database Administrator**: [Contact Info]
- **Application Developer**: [Contact Info]
- **Hosting Provider**: [Contact Info]
