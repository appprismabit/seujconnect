"use client";
import Count from "@/components/common/Count";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import dashboard_count_data from "@/data/dashboard-data/DashboardCounterData";
import { UserDetails, initializeToken } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState, useRef } from "react";

const DashboardCounter = ({ style }: any) => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const [count, setCount] = useState<{ [key: number]: number }>({});
    const userDetails = useSelector((state: RootState) => state.auth.user) as UserDetails | null;
    const previousTokenRef = useRef<string | null>(null);

    useEffect(() => {
      
        dispatch(initializeToken());
         // Fetch counts after dispatching token initialization
    }, [dispatch]);
    useEffect(() => {
      fetchCount();
    
         // Fetch counts after dispatching token initialization
    }, []);


    const fetchCount = async () => {
      
        const storedToken = localStorage.getItem('token');
       
        
        if (storedToken) {
        
            previousTokenRef.current = storedToken;

            const formData = new FormData();
            formData.append('token', storedToken);

            try {
                // Directly access the public URL
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                console.log(apiUrl)
                const response = await fetch(`${apiUrl}api/article/articleCount`, { // Removed space
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched count data:", data);
                setCount(data.count);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        } else {
            console.warn("No new token found. Skipping fetch.");
        }
    };

    const roleBasedData = userDetails?.role === 0
        ? dashboard_count_data[0].dashboard_count_data // Admin data
        : userDetails?.role === 1
            ? dashboard_count_data[0].dashboard_count_data // User data
            : []; // Handle other roles or conditions

    return (
        <>
            {roleBasedData && (
                <>
                    {roleBasedData.map((item) => (
                        <div key={item.id} className="col-lg-3 col-md-3 col-sm-6">
                            <div className="dashboard__counter-item">
                                <div className="icon">
                                    <i className={item.icon}></i>
                                </div>
                                <div className="content">
                                    <span className="count">
                                        <Count number={count[item.flag] || 0} />
                                    </span>
                                    <p style={{ marginTop: "14px" }}>{item.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default DashboardCounter;
