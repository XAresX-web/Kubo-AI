import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailData {
  email: string;
  name?: string;
}

export async function sendWelcomeEmail({ email, name }: EmailData) {
  try {
    // Validar que tenemos la API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not found in environment variables");
      return {
        success: false,
        error: "Email service not configured",
      };
    }

    // In development/testing, only send to verified email
    const isDevelopment = process.env.NODE_ENV === "development";
    const verifiedEmail = "luissanchezb100@gmail.com";

    // Use verified domain email or fallback to verified email for testing
    const fromEmail =
      process.env.FROM_EMAIL || "KUBO AI <onboarding@resend.dev>";
    const toEmail = isDevelopment ? verifiedEmail : email;

    console.log(`Sending welcome email to: ${toEmail} (original: ${email})`);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: "🚀 ¡Bienvenido a la revolución de KUBO AI!",
      html: getWelcomeEmailTemplate(name || "Desarrollador", email),
    });

    if (error) {
      console.error("Error sending welcome email:", error);

      // If it's a domain verification error, provide helpful message
      if (
        error.message?.includes("verify a domain") ||
        error.message?.includes("domain")
      ) {
        return {
          success: false,
          error: "Email service configuration needed. Contact support.",
          needsDomainVerification: true,
        };
      }

      return {
        success: false,
        error: error.message || "Failed to send email",
      };
    }

    console.log("Welcome email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error in sendWelcomeEmail:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendNotificationEmail({ email, name }: EmailData) {
  try {
    // Validar que tenemos la API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not found in environment variables");
      return {
        success: false,
        error: "Email service not configured",
      };
    }

    // In development/testing, only send to verified email
    const isDevelopment = process.env.NODE_ENV === "development";
    const verifiedEmail = "luissanchezb100@gmail.com";

    // Use verified domain email or fallback to verified email for testing
    const fromEmail =
      process.env.FROM_EMAIL || "KUBO AI <onboarding@resend.dev>";
    const toEmail = isDevelopment ? verifiedEmail : email;

    console.log(
      `Sending notification email to: ${toEmail} (original: ${email})`
    );

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: "🎉 ¡KUBO AI ya está disponible! Tu acceso exclusivo te espera",
      html: getNotificationEmailTemplate(name || "Desarrollador", email),
    });

    if (error) {
      console.error("Error sending notification email:", error);

      // If it's a domain verification error, provide helpful message
      if (
        error.message?.includes("verify a domain") ||
        error.message?.includes("domain")
      ) {
        return {
          success: false,
          error: "Email service configuration needed. Contact support.",
          needsDomainVerification: true,
        };
      }

      return {
        success: false,
        error: error.message || "Failed to send email",
      };
    }

    console.log("Notification email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error in sendNotificationEmail:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

function getWelcomeEmailTemplate(name: string, originalEmail: string): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bienvenido a KUBO AI</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #000;
        }
        .container {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 36px;
          font-weight: bold;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #888;
          font-size: 16px;
        }
        .content {
          color: #e5e5e5;
          margin-bottom: 30px;
        }
        .highlight {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
        }
        .features {
          background: rgba(59, 130, 246, 0.1);
          border-radius: 15px;
          padding: 25px;
          margin: 25px 0;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
        .feature-item {
          display: flex;
          align-items: center;
          margin: 15px 0;
          color: #e5e5e5;
        }
        .feature-icon {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          margin-right: 15px;
          display: inline-block;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 10px;
          font-weight: bold;
          margin: 20px 0;
          text-align: center;
        }
        .footer {
          text-align: center;
          color: #666;
          font-size: 14px;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #333;
        }
        .dev-note {
          background: rgba(255, 193, 7, 0.1);
          border: 1px solid rgba(255, 193, 7, 0.3);
          border-radius: 10px;
          padding: 15px;
          margin: 20px 0;
          color: #ffc107;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }
          .container {
            padding: 20px;
          }
          .logo {
            font-size: 28px;
          }
          .cta-button {
            padding: 12px 24px;
            font-size: 14px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">KUBO AI</div>
          <div class="subtitle">La próxima generación de IA para desarrollo</div>
        </div>
        
        <div class="content">
          <h2 style="color: #e5e5e5;">¡Hola ${name}! 👋</h2>
          
          <p>¡Bienvenido a la revolución del desarrollo de software! Te has unido a un grupo exclusivo de visionarios que serán los primeros en experimentar el futuro de la programación.</p>
          
          ${
            process.env.NODE_ENV === "development"
              ? `
          <div class="dev-note">
            <strong>📧 Nota de Desarrollo:</strong> Este email fue enviado a la dirección verificada para testing. 
            El registro original fue para: <strong>${originalEmail}</strong>
          </div>
          `
              : ""
          }
          
          <p><span class="highlight">KUBO AI</span> no es solo otra herramienta de IA. Es una revolución completa que cambiará para siempre cómo creamos software.</p>
          
          <div class="features">
            <h3 style="color: #3b82f6; margin-top: 0;">Lo que te espera:</h3>
            
            <div class="feature-item">
              <span class="feature-icon"></span>
              <span><strong>Velocidad 10x superior:</strong> De idea a aplicación desplegada en minutos</span>
            </div>
            
            <div class="feature-item">
              <span class="feature-icon"></span>
              <span><strong>Código perfecto:</strong> Production-ready desde el primer intento</span>
            </div>
            
            <div class="feature-item">
              <span class="feature-icon"></span>
              <span><strong>IA avanzada:</strong> Comprende contexto completo y genera arquitecturas complejas</span>
            </div>
            
            <div class="feature-item">
              <span class="feature-icon"></span>
              <span><strong>Acceso gratuito:</strong> Los early adopters tendrán beneficios exclusivos de por vida</span>
            </div>
          </div>
          
          <p>Como miembro de nuestra lista de espera, serás notificado <strong>inmediatamente</strong> cuando KUBO AI esté disponible. Además, tendrás:</p>
          
          <ul style="color: #e5e5e5;">
            <li>🎯 <strong>Acceso prioritario</strong> antes que el público general</li>
            <li>🎁 <strong>Beneficios exclusivos</strong> para early adopters</li>
            <li>📚 <strong>Documentación avanzada</strong> y tutoriales exclusivos</li>
            <li>💬 <strong>Soporte directo</strong> del equipo de desarrollo</li>
          </ul>
          
          <p>Estamos trabajando día y noche para hacer realidad esta visión. El futuro del desarrollo de software está más cerca de lo que imaginas.</p>
        </div>
        
        <div style="text-align: center;">
          <a href="https://kubo-ai-beta.vercel.app" class="cta-button">Visitar KUBO AI</a>
        </div>
        
        <div class="footer">
          <p>¿Tienes preguntas? Responde a este email y te contestaremos personalmente.</p>
          
          <p style="font-size: 12px; color: #555; margin-top: 15px;">
            Recibiste este email porque te registraste en la lista de espera de KUBO AI.<br>
            Si no deseas recibir más emails, <a href="#" style="color: #666;">cancela tu suscripción aquí</a>.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function getNotificationEmailTemplate(
  name: string,
  originalEmail: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>¡KUBO AI ya está aquí!</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #000;
        }
        .container {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 42px;
          font-weight: bold;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .announcement {
          background: linear-gradient(135deg, #10b981, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin: 20px 0;
        }
        .content {
          color: #e5e5e5;
          margin-bottom: 30px;
        }
        .highlight {
          background: linear-gradient(135deg, #10b981, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          color: white;
          padding: 20px 40px;
          text-decoration: none;
          border-radius: 15px;
          font-weight: bold;
          font-size: 18px;
          margin: 20px 0;
          text-align: center;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        }
        .urgency {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        .footer {
          text-align: center;
          color: #666;
          font-size: 14px;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #333;
        }
        .dev-note {
          background: rgba(255, 193, 7, 0.1);
          border: 1px solid rgba(255, 193, 7, 0.3);
          border-radius: 10px;
          padding: 15px;
          margin: 20px 0;
          color: #ffc107;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          body {
            padding: 10px;
          }
          .container {
            padding: 20px;
          }
          .logo {
            font-size: 32px;
          }
          .announcement {
            font-size: 20px;
          }
          .cta-button {
            padding: 15px 30px;
            font-size: 16px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">KUBO AI</div>
          <div class="announcement">¡YA ESTÁ DISPONIBLE!</div>
        </div>
        
        <div class="content">
          <h2 style="color: #e5e5e5;">¡${name}, el momento ha llegado! 🚀</h2>
          
          <p>Después de meses de desarrollo intensivo, <span class="highlight">KUBO AI</span> está oficialmente disponible y listo para revolucionar tu forma de desarrollar software.</p>
          
          ${
            process.env.NODE_ENV === "development"
              ? `
          <div class="dev-note">
            <strong>📧 Nota de Desarrollo:</strong> Este email fue enviado a la dirección verificada para testing. 
            El registro original fue para: <strong>${originalEmail}</strong>
          </div>
          `
              : ""
          }
          
          <p>Como miembro de nuestra lista de espera, tienes <strong>acceso prioritario</strong> y beneficios exclusivos que no están disponibles para el público general.</p>
          
          <div class="urgency">
            <h3 style="color: #ef4444; margin-top: 0;">⏰ Oferta de Lanzamiento - Solo 48 horas</h3>
            <p style="color: #e5e5e5; margin-bottom: 0;">Acceso gratuito de por vida para los primeros 1,000 usuarios de la lista de espera</p>
          </div>
          
          <p><strong>Tu código de acceso exclusivo:</strong> <code style="background: #333; padding: 5px 10px; border-radius: 5px; color: #3b82f6;">EARLY-${name.toUpperCase().replace(/\s+/g, "")}-2025</code></p>
        </div>
        
        <div style="text-align: center;">
          <a href="https://kubo-ai-beta.vercel.app" class="cta-button">🚀 ACCEDER A KUBO AI AHORA</a>
        </div>
        
        <div class="content">
          <h3 style="color: #3b82f6;">Lo que puedes hacer desde hoy:</h3>
          <ul style="color: #e5e5e5;">
            <li>✨ Crear aplicaciones web completas en minutos</li>
            <li>🎯 Generar código production-ready al instante</li>
            <li>🔧 Integrar APIs y servicios automáticamente</li>
            <li>📱 Desarrollar para web, móvil y desktop</li>
            <li>🚀 Desplegar con un solo comando</li>
          </ul>
          
          <p><strong>¿Necesitas ayuda?</strong> Responde a este email y nuestro equipo te asistirá personalmente.</p>
        </div>
        
        <div class="footer">
          <p>¡Gracias por ser parte de esta revolución!</p>
          <p>El equipo de KUBO AI</p>
          
          <p style="font-size: 12px; color: #555; margin-top: 20px;">
            Este email fue enviado a los miembros de la lista de espera de KUBO AI.<br>
            <a href="#" style="color: #666;">Cancelar suscripción</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}
