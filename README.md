# 🔒 Secure Cybersecurity Portfolio

A professionally designed portfolio website showcasing cybersecurity expertise with **security-first development practices**.

![Portfolio Preview](assets/images/homepage.png)

---

## 🎯 About

This portfolio demonstrates not just cybersecurity knowledge, but also **secure coding practices** and **defense-in-depth principles** in web development. Every feature is built with security in mind.

**Live Demo:** [Coming Soon]

---

## ✨ Features

### 🎨 Design
- Kali Linux-inspired terminal theme
- Matrix rain animation effect
- Responsive design (mobile-friendly)
- Smooth scroll animations
- Interactive project cards

### 🔐 Security Features

This portfolio implements **production-grade security measures**:

- ✅ **Client-Side Rate Limiting** - Prevents spam (3 submissions/minute)
- ✅ **Content Security Policy (CSP)** - Blocks XSS and clickjacking
- ✅ **Console Log Sanitization** - Prevents information disclosure
- ✅ **Input Validation** - Email format and required field validation
- ✅ **Secure External Links** - All links use `rel="noopener noreferrer"`
- ⏳ **EmailJS Domain Restrictions** - Pending deployment
- ⏳ **reCAPTCHA v3** - Optional bot protection (pending deployment)

**See:** [SECURITY.md](SECURITY.md) for complete security documentation.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Fonts:** Google Fonts (Fira Code, Inter)
- **Icons:** Font Awesome 6.4.0
- **Email Service:** EmailJS
- **Security:** CSP, Rate Limiting, Input Validation

---

## 📂 Project Structure

```
cybersecurity-portfolio/
├── index.html              # Main HTML file
├── style.css              # Styling and animations
├── script.js              # Interactive features & security logic
├── assets/
│   ├── images/           # Profile and project images
│   ├── kali-linux-1.svg  # Kali logo
│   └── resume.pdf        # CV/Resume
├── SECURITY.md           # Security documentation
└── POST_DEPLOYMENT_TASKS.md  # Post-deployment checklist
```

---

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/harish-d2023/cybersecurity-portfolio.git
   cd cybersecurity-portfolio
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

3. **Configure EmailJS** (for contact form)
   - Create account at [EmailJS](https://www.emailjs.com/)
   - Update credentials in `script.js` (lines 649, 692)
   - See [POST_DEPLOYMENT_TASKS.md](POST_DEPLOYMENT_TASKS.md)

### Deployment

**Recommended Platforms:**
- GitHub Pages (Free)
- Netlify (Free)
- Vercel (Free)

**After deployment, complete:**
1. EmailJS domain restrictions
2. (Optional) reCAPTCHA v3 integration

See: [POST_DEPLOYMENT_TASKS.md](POST_DEPLOYMENT_TASKS.md) for detailed instructions.

---

## 🔒 Security

This portfolio is built with **security-first principles** and demonstrates:

- OWASP Top 10 compliance
- Defense-in-depth architecture
- Secure coding practices
- Proactive vulnerability mitigation

**Security Features:**
- Rate limiting prevents automated attacks
- CSP blocks unauthorized code execution
- Input validation prevents injection attacks
- Minimal information disclosure

**Full Security Documentation:** [SECURITY.md](SECURITY.md)

---

## 📧 Contact

**Harish D**  
Cybersecurity Analyst | Security Researcher


- 💼 LinkedIn: [linkedin.com/in/harish-d-703b4026a](https://www.linkedin.com/in/harish-d-703b4026a)
- 🐙 GitHub: [github.com/harish-d2023](https://github.com/harish-d2023)

---

## 📝 License

This project is open source. Feel free to use it for your own portfolio with attribution.

---

## 🙏 Acknowledgments

- Kali Linux for design inspiration
- EmailJS for contact form service
- Font Awesome for icons
- Google Fonts for typography

---

## 🔐 Security Disclosure

Found a security vulnerability? Please report it responsibly:


**Subject:** [SECURITY] Portfolio Vulnerability Report

See [SECURITY.md](SECURITY.md) for full disclosure policy.

---

**Built with 🔒 security and ❤️ passion for cybersecurity.**
