# Deployment steps

# steps for publishing deployment on server side 
1. git pull 
2. nodenv shell 16
3. npm install
4. npm run build 
5. copy files and folder inside the build folder to the root folder then add the following tag manager for google after the opening <head> tag to index.html.
 
## Google Tag Manager 
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HZGYF7FHL2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HZGYF7FHL2');
</script>