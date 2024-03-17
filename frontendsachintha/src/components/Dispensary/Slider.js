import { FunctionComponent } from 'react';
import styles from './Slider.module.css';
import image from '../../images/2121.jpg';


const Slider:FunctionComponent = () => {
  	return (
    		<div className={styles.slider}>
      			<div className={styles.treatmentList}>
        				<div className={styles.imagesParent}>
          					<div className={styles.images}>
            						<div className={styles.slderNav}>
              							<img className={styles.sliderNavIcon} alt="" src="Slider_Nav.svg" />
              							<img className={styles.sliderNavIcon} alt="" src="Slider_Nav.svg" />
              							<img className={styles.sliderNavIcon} alt="" src="Slider_Nav.svg" />
              							<img className={styles.sliderNavIcon} alt="" src="Slider_Nav.svg" />
              							<img className={styles.sliderNavIcon} alt="" src="Slider_Nav.svg" />
            						</div>
            						<div className={styles.arrowBtn}>
              							<div className={styles.categoryIcon} />
              							<img className={styles.iconLeft} alt="" src={`🦆 icon "left".svg`} />
              							<img className={styles.iconLeft} alt="" src={`🦆 icon "right".svg`} />
              							<div className={styles.left} />
              							<div className={styles.right} />
            						</div>
          					</div>
          					<div className={styles.treatments}>
            						<div className={styles.treatmentParent}>
              							<div className={styles.treatment}>
                								<div className={styles.trName}>
                  									<b className={styles.arthritis}>{`Dislocation Features of Joints & bones`}</b>
                  									<div className={styles.signIn}>
                    										<b className={styles.seeMore}>See more</b>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.treatment}>
                								<div className={styles.trName}>
                  									<b className={styles.arthritis}>Respiratory Disorders</b>
                  									<div className={styles.signIn}>
                    										<b className={styles.seeMore}>See more</b>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.treatment}>
                								<div className={styles.trName}>
                  									<b className={styles.arthritis}>Arthritis</b>
                  									<div className={styles.signIn}>
                    										<b className={styles.seeMore}>See more</b>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.treatment}>
                								<div className={styles.trName}>
                  									<b className={styles.arthritis}>Skin Diseases</b>
                  									<div className={styles.signIn}>
                    										<b className={styles.seeMore}>See more</b>
                  									</div>
                								</div>
              							</div>
              							<div className={styles.treatment}>
                								<div className={styles.trName}>
                  									<b className={styles.arthritis}>Neurological Diseases and Paralysis</b>
                  									<div className={styles.signIn}>
                    										<b className={styles.seeMore}>See more</b>
                  									</div>
                								</div>
              							</div>
            						</div>
            						<b className={styles.treatmentList1}>Treatment List</b>
            						<img className={styles.pharmacyStoreIcon} alt="" src="../../src/images/2121.jpg" />
          					</div>
        				</div>
      			</div>
      			<img className={styles.sliderNavIcon5} alt="" src="Slider_Nav.svg" />
    		</div>);
};

export default Slider;
