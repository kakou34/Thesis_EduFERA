import React from 'react';
import './aboutUsPage.styles.scss'
import kaouther_certificate from './kaouther_certificate.jpg'
import ridwan_certificate from './ridwan_certificate.jpg'
import nedzma_certificate from './nedzma_certificate.jpg'


const AboutUsPage = (props) => {

      return (
        <div className='page-container' >
          <div className='title-container'>
           <h1 style={{color: "black", fontSize:50,height:'100%', letterSpacing:5}}>About us!</h1>
          </div>
          <div className='definition-container'>
           <div className='topic-container'>
           <h1 style={{color: "white", fontSize:30, letterSpacing:2}}>What is EduFERA</h1>
           </div>
           <div className='definition'>
             <p style={{color:'#383836', fontSize:25, fontWeight:'bold', textAlign:'center'}}>EduFERA is an AI tool that aims to provide emotional
             feedback for educators during online lectures based on the
             students’ facial expressions.
             This will bring the online
             lecturing experience one step closer to classical face-to-face teaching.
             It combines modern deep learning and software
             engineering technologies to provide both real-time response
             during online classes and offline analysis of recorded
             lectures.
             It provides a detailed post-lecture assessment using a userfriendly
             web interface.
             It provides a Web API and a ReactJS frontend that can be
             used by Online Education platforms.
             </p>
           </div>

          </div>
          <div className='services-container'>
           <div className='topic-container'>
            <h1 style={{color: "white", fontSize:30,letterSpacing:2}}>Services</h1>
           </div>
           <div className='services'>
            <div className='first-service'>
            <h1>1.</h1>
            <h2 style={{color:'#383836',textAlign:'center'}}>
            A real-time emotional analysis during online lectures</h2>
            </div>
            <div className='second-service'>
            <h1>2.</h1>
            <h2 style={{color:'#383836',textAlign:'center'}}>
            Detailed results of the emotional analysis after online lectures.
            </h2>
            </div>
            <div className='third-service'>
            <h1>3.</h1>
            <h2 style={{color:'#383836',textAlign:'center'}}>
            An offline emotional analysis for recorded lectures.
            </h2>
            </div>
           </div>
          </div>

          <div className='team-container'>
          <div className='topic-container' >
          <h1 style={{color: "white", fontSize:30,letterSpacing:2}}>Accomplishments</h1>
          </div>
          <div className='proje-fuari-text'>
          <h3 style={{color:'#383836',textAlign:'center'}}>EduFERA ranked first among the projects of the Computer Engineering department in
          'Eskisehir Technical University', Engineering Faculty's 14. Graduation Projects Fair and Competition.
          </h3>
          </div>
          <div className='certificates-container'>
           <div className='certificate'>
           <img src={kaouther_certificate} style={{width:'100%',height:'100%', marginLeft:20, marginBottom:20}} alt="certificate" />
           </div>
           <div className='certificate'>
           <img src={nedzma_certificate} style={{width:'100%',height:'100%', marginBottom:20}} alt="certificate" />
           </div>
           <div className='certificate'>
           <img src={ridwan_certificate} style={{width:'100%',height:'100%', marginRight:20, marginBottom:20}} alt="certificate" />
           </div>

          </div>
          </div>
          <div className='documentation-container'>
          <div className='topic-container'>
          <h1 style={{color: "white", fontSize:30,letterSpacing:2}}>Documentation</h1>
          </div>
          <div className='documents_container'>
          <div className='document'>
          <a style={{textDecoration:'none', color:'#98AFC7', fontWeight:'bold', fontSize:20}} href='https://drive.google.com/file/d/1OKejVu5RDCqZRkR48acRMwOCsPLubkpb/view?usp=sharing'>
          Poster link</a>
          </div>
          <div className='document'>
          <a style={{textDecoration:'none', color:'#C6DEFF', fontWeight:'bold', fontSize:20}} href='https://drive.google.com/file/d/1yltq5HYmxTQB8wIHPvgRr3xz2_2_n_G0/view?usp=sharing'>
          Presentation link</a>
          </div>
          <div className='document'>
          <a style={{textDecoration:'none', color:'#98AFC7', fontWeight:'bold', fontSize:20}} href='https://drive.google.com/file/d/1jSyVafpNP-ajy6cGQUXaiv4k1p0Wjuwl/view?usp=sharing'>
          Video link</a>
          </div>

          <div className='document'>
          <a style={{textDecoration:'none', color:'#C6DEFF', fontWeight:'bold', fontSize:20}} href='https://drive.google.com/file/d/1mdAb9eWb_v-ba3yFEj-ynFyO6z_vsCSQ/view?usp=sharing'>
          Report link</a>
          </div>
          </div>
          </div>
          <div className='getintouch-conatiner'>
            <div className='topic-container'>
             <h1 style={{color: "white", fontSize:30,letterSpacing:2}}>Get in touch with us</h1>
            </div>
            <div className='emails-conatiner'>
             <div className='email'>
             <p style={{ fontWeight:'bold', color:'#939390'}}>KAOUTHER MOUHEB</p>
              <p style={{ fontWeight:'bold', color:'#939390'}}>kmouheb@eskisehir.edu.tr</p>

             </div>
             <div className='email'>
             <p style={{ fontWeight:'bold', color:'#939390'}}>NEDZMA DERVISBEGOVIC</p>
              <p style={{ fontWeight:'bold', color:'#939390'}}>nedzmadervisbegovic@eskisehir.edu.tr
              </p>
             </div>
             <div className='email'>
             <p style={{ fontWeight:'bold', color:'#939390'}}>RIDWAN ALI MOHAMMED</p>
              <p style={{ fontWeight:'bold', color:'#939390'}}>ridwanalimohammed@eskisehir.edu.tr</p>
             </div>
            </div>
          </div>

        </div>
      );

  }
  export default AboutUsPage;