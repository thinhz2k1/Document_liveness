// components
import PageHeader from '@layout/PageHeader';
import MainProfileInfo from '@widgets/MainProfileInfo';
import SalesStats from '@widgets/SalesStats';
import TotalReport from '@widgets/TotalReport';
import TotalBalance from '@components/Banners/TotalBalance';
import mainImage from '@assets/apps/DA_MD.jpg'
import mainPart1 from '@assets/apps/DA_MD1.jpg'
import mainPart2 from '@assets/apps/DA_MD2.jpg'
import mainPart3 from '@assets/apps/DA_MD3.jpg'

// hooks
import { useWindowSize } from 'react-use';
import { useNavigate } from 'react-router-dom';

const SalesAnalytics = () => {
    const { width } = useWindowSize();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/cross-check')
    }

    return (
        <>
            <PageHeader title="Homepage" />
            {/* <div className="widgets-grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-[minmax(0,_951px)_minmax(0,_1fr)]">
                <MainProfileInfo/>
                {width >= 1536 && <TotalBalance />}
                <SalesStats/>
                <TotalReport/>
            </div> */}
            <img className='mb-4' src={mainImage} alt="" />
            <div class="flex mb-4">
                <div class="w-1/3 bg-gray-500 h-12">
                    <div className='flex justify-center mb-4'>
                        <img className='w-36 h-36 rounded-lg' src={mainPart2} />
                    </div>
                    <h3 className='text-center'>Step 1: Cross Check</h3>
                    <div className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, quasi asperiores veritatis ducimus et reiciendis perspiciatis dolorem voluptas obcaecati, repellat similique numquam in hic. Numquam sunt sit accusantium quibusdam quia.</div>
                </div>
                <div class="w-1/3 bg-gray-500 h-12">
                    <div className='flex justify-center mb-4'>
                        <img className='w-36 h-36 rounded-lg' src={mainPart1} />
                    </div>
                    <h3 className='text-center'>Step 2: Forgery Chip-based ID-Card Detector</h3>
                    <div className='text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur vel harum voluptatibus obcaecati praesentium? Mollitia iure a dolore eligendi, asperiores eos quis, cum doloribus velit fugit minima voluptatibus ad temporibus.</div>
                </div>
                <div class="w-1/3 bg-gray-500 h-12">
                    <div className='flex justify-center mb-4'>
                        <img className='w-36 h-36 rounded-lg' src={mainPart3} />
                    </div>
                    <h3 className='text-center'>Step 3: Tamper Localization</h3>
                    <div className='text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae aliquid, nam aspernatur repellat aliquam cumque quaerat est dolorum hic alias accusamus dicta. Maxime voluptas expedita modi harum, corrupti nam quos?</div>
                </div>
            </div>
            <div className='flex justify-center mt-20'>
                <button className="btn btn--primary w-36 md:mt-40" onClick={handleNavigate}>Start now</button>
            </div>
        </>
    )
}

export default SalesAnalytics