import os
import pandas as pd
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import time
import random

load_dotenv()

def template_email(user_name, has_ticket):
    if has_ticket:
        text_body = f"""
Assunto: Obrigado por participar da nossa rifa de casamento!

Olá, {user_name}!

Muito obrigado por comprar um bilhete da nossa rifa — você ajudou a tornar nosso casamento ainda mais especial.

Aviso rápido: o sorteio será no dia 30/09 e será transmitido no Instagram. Acompanhe pelo link: https://www.instagram.com/_barbaragms/

Se seu nome for sorteado entraremos em contato pelo e-mail/telefone cadastrado.

Mais uma vez, obrigada(o) pelo apoio — esperamos que você!

Com carinho,
Bárbara & Natanael
"""
        html_body = """
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Rifa de casamento — Data do sorteio</title>
  <style>
    /* estilos inline simples para compatibilidade */
    body { margin:0; padding:0; background:#f4f4f6; font-family: Arial, Helvetica, sans-serif; color:#333333; }
    .container { max-width:600px; margin:20px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.08); }
    .header { background:#e11d48; color:#050303; padding:24px; text-align:center; }
    .logo { font-weight:700; font-size:20px; letter-spacing:0.4px; }
    .content { padding:24px; line-height:1.5; }
    .cta { display:block; width:220px; margin:18px auto; text-align:center; padding:12px 18px; background:#e11d48; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600; }
    .footer { padding:16px 24px; font-size:13px; color:#777777; background:#fbfbfc; text-align:center; }
    .small { font-size:13px; color:#050303; }
    @media only screen and (max-width:420px) {
      .container { margin:10px; }
      .cta { width:80%; }
    }
  </style>
</head>
<body>
  <div class="container" role="article" aria-label="Agradecimento - Sorteio 30/09">
    <div class="header">
      <div class="logo">Bárbara & Natanael</div>
      <div class="small">rifa de casamento — agradecimento</div>
    </div>

    <div class="content">
      <p>Olá, <strong>{{USERNAME}}</strong>!</p>

      <p>Muito obrigado por comprar um bilhete da nossa rifa — você ajudou a tornar nosso casamento ainda mais especial. 💖</p>

      <p>Queremos avisar que o <strong>sorteio será no dia 30/09 às 20h</strong> e será transmitido pelo nosso Instagram. Fique à vontade para acompanhar e torcer com a gente!</p>

      <p style="text-align:center;">
        <a class="cta" href="https://www.instagram.com/_barbaragms/" target="_blank" rel="noopener">@_barbaragms</a>
      </p>
      <p style="text-align:center;">
        <a class="cta" href="https://www.instagram.com/_natanaelw/" target="_blank" rel="noopener">@_natanaelw</a>
      </p>

      <p class="small">Observações:</p>
      <ul class="small">
        <li>Caso seu nome seja sorteado entraremos em contato pelo e-mail/telefone cadastrado.</li>
      </ul>

      <p>Mais uma vez, agradecemos demais pelo apoio — esperamos que você ganhe!</p>

      <p>Com carinho,<br>
      <strong>Bárbara & Natanael</strong></p>
    </div>

    <div class="footer">
      <div style="margin-top:8px; font-size:12px; color:#999999;">© 2025 — Operação Casamento B&N. Feito com ❤️ para nosso futuro juntos.</div>
    </div>
  </div>
</body>
</html>
    """
        return text_body, html_body.replace('{{USERNAME}}', user_name)
    
    text_body = f"""
Olá {user_name},

O sorteio da nossa rifa de casamento acontece em 30/09 e você ainda tem tempo de garantir seu ticket! 💖

Além de concorrer a prêmios, você nos ajuda a tornar esse momento tão especial ainda mais inesquecível.

Garanta sua rifa aqui: https://operacao-casamento.vercel.app/

Se tiver qualquer dificuldade, basta responder a este e-mail ou falar conosco no WhatsApp: 
Bárbara - 11977838246
Natanael - 11913339320

Não deixe para a última hora — esperamos você no sorteio!

Com carinho,
Bárbara & Natanael
"""
    html_body = """<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Rifa de casamento — Data do sorteio</title>
  <style>
    /* estilos inline simples para compatibilidade */
    body { margin:0; padding:0; background:#f4f4f6; font-family: Arial, Helvetica, sans-serif; color:#333333; }
    .container { max-width:600px; margin:20px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.08); }
    .header { background:#e11d48; color:#050303; padding:24px; text-align:center; }
    .logo { font-weight:700; font-size:20px; letter-spacing:0.4px; }
    .content { padding:24px; line-height:1.5; }
    .cta { display:block; width:220px; margin:18px auto; text-align:center; padding:12px 18px; background:#e11d48; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600; }
    .footer { padding:16px 24px; font-size:13px; color:#777777; background:#fbfbfc; text-align:center; }
    .small { font-size:13px; color:#050303; }
    @media only screen and (max-width:420px) {
      .container { margin:10px; }
      .cta { width:80%; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Últimos dias para participar da rifa!</div>
    </div>

    <div class="content">
      <p>Olá <strong>{{USERNAME}}</strong>,</p>

      <p>O <strong>sorteio da nossa rifa de casamento acontece em 30/09</strong> e você ainda tem tempo de garantir seu ticket! 💖</p>

      <p>Além de concorrer a prêmios, você nos ajuda a tornar esse momento tão especial ainda mais inesquecível. ✨</p>

      <p style="text-align:center;">
        <a class="cta" href="https://operacao-casamento.vercel.app/" target="_blank" rel="noopener">Comprar minha rifa agora</a>
      </p>

      <p>
        Se tiver qualquer dificuldade ou dúvida, é só falar conosco diretamente pelo WhatsApp: 
        <a href="https://wa.me/+5511977838246?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20rifa" target="_blank">Bárbara</a>.
        <a href="https://wa.me/+5511913339320?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20rifa" target="_blank">Natanael</a>.
      </p>

      <p>Não deixe para a última hora — esperamos você no sorteio!</p>

      <p>Com carinho,<br>
      <strong>Bárbara & Natanael</strong></p>
    </div>

    <div class="footer">
      <div style="margin-top:8px; font-size:12px; color:#999999;">© 2025 — Operação Casamento B&N. Feito com ❤️ para nosso futuro juntos.</div>
    </div>
  </div>
</body>
</html>"""
    return text_body, html_body.replace('{{USERNAME}}', user_name)

def send_email(user, has_ticket):
    sender = os.getenv('EMAIL_USER')
    receiver = user['email']
    user_name = user['name']
    password = os.getenv('EMAIL_PASS')

    message = MIMEMultipart()
    message["From"] = sender
    message["To"] = receiver
    message["Subject"] = "Operação Casamento B&N"

    text_body, html_body = template_email(user_name, has_ticket)

    message.attach(MIMEText(html_body, "html"))
    message.attach(MIMEText(text_body, "plain"))
    
    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender, password)
            server.sendmail(sender, receiver, message.as_string())
        print(f'Enviado para {user_name}')
    except Exception as e:
        print(f"Erro ao enviar para {user_name}: {e}")


payments_file = os.path.join(os.getcwd(), 'payments.json')
users_file = os.path.join(os.getcwd(), 'users.json')

payments = pd.read_json(payments_file)
users = pd.read_json(users_file)
cancelled_payments = payments[payments['status'] == 'cancelled'].drop_duplicates(subset=['userId'])
approved_payments = payments[payments['status'] == 'approved'].drop_duplicates(subset=['userId'])

users_with_ticket = list()
users_without_ticket = list()

for cancelled_payment in cancelled_payments.to_dict(orient='records'):
    user_id = cancelled_payment['userId']
    user = users[users['id'] == user_id].to_dict(orient='records')[0]
    user_has_not_ticket = approved_payments[approved_payments['userId'] == user_id].dropna().empty
    if(user_has_not_ticket):
        # print('Não tem ticket', user['name'])
        users_without_ticket.append(user_id)
    else:
        # print('Já tem ticket', user['name'])
        users_with_ticket.append(user_id)


for user in users.to_dict(orient='records'):
    user_has_not_ticket = payments[payments['userId'] == user['id']].dropna().empty
    if(user_has_not_ticket):
        print('Não tem ticket', user['name'])
        users_without_ticket.append(user['id'])

for user in users_with_ticket:
    print(user)
    user_info = users[users['id'] == user_id].to_dict(orient='records')[0]
    print(f'Enviando para {user_info['name']}')
    # send_email(user_info, True)
    # pausa = random.randint(5, 15)
    # print(f"Aguardando {pausa}s antes do próximo envio...")
    # time.sleep(pausa)

for user in users_without_ticket:
    user_info = users[users['id'] == user_id].to_dict(orient='records')[0]
    print(f'Enviando para {user_info['name']}')
    # send_email(user_info, False)
    # pausa = random.randint(5, 15)
    # print(f"Aguardando {pausa}s antes do próximo envio...")
    # time.sleep(pausa)