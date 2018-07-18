/* global graphql */

import React from 'react';
import SideNav from '../components/sideNav';
import Features from '../components/features';
import HowTo from '../components/how-to';
import './_pages.scss';
// import './_simple-sidebar.scss';

const DocsPage = props =>
  (
    <React.Fragment>
      <div className="container-fluid h-100">
          <div className="row h-100">
              <div className="col-2 collapse d-md-flex bg-light pt-2 h-100" id="sidebar">
                <SideNav />
              </div>
              <div className="col pt-2">
                  <h2>
                    Documentation
                  </h2>
                  <h6 className="hidden-sm-down">Shrink page width to see sidebar collapse</h6>
                  <p>Documentation content here</p>
              </div>
          </div>
      </div>
    </React.Fragment>
  );
  // (<main>
  //   <nav className="pf-c-vertical-nav " aria-label="Some Navigation Region">
  //     <ul>
  //       <li className="pf-c-vertical-nav__item ">
  //         <a href="#" className="pf-c-vertical-nav__link pf-m-active " aria-current="page">
  //           <span className="pf-c-vertical-nav__link-text ">Home</span>
  //         </a>
  //       </li>
  //       <li className="pf-c-vertical-nav__item ">
  //         <a href="#" className="pf-c-vertical-nav__link pf-m-disabled " aria-disabled="true">
  //           <span className="pf-c-vertical-nav__link-text ">Unnecessarily long name extending to 2 lines</span>
  //         </a>
  //       </li>
  //       <li className="pf-c-vertical-nav__item ">
  //         <a href="#" className="pf-c-vertical-nav__link ">
  //           <span className="pf-c-vertical-nav__link-text ">Monitoring</span>
  //         </a>
  //       </li>
  //       <li className="pf-c-vertical-nav__item ">
  //         <a href="#" className="pf-c-vertical-nav__link ">
  //           <span className="pf-c-vertical-nav__link-text ">Builds</span>
  //         </a>
  //       </li>
  //       <li className="pf-c-vertical-nav__item ">
  //         <a href="#" className="pf-c-vertical-nav__link ">
  //           <span className="pf-c-vertical-nav__link-text ">Resources</span>
  //         </a>
  //       </li>
  //     </ul>
  //   </nav>
  //   <Features data={props.data.allDataJson.edges[0].node.features} />
  //   <HowTo data={props.data.allDataJson.edges[0].node.howTo} />
  // </main>);

export default DocsPage;

// export const pageQuery = graphql`
//   query IndexQuery {
//     allDataJson {
//       edges {
//         node {
//           features {
//             title
//           }
//           howTo {
//             title
//           }
//         }
//       }
//     }
//   }
// `;
