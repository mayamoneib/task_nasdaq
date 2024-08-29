    'use client';
    import { useEffect, useState, useRef, SetStateAction } from "react";
    import React from 'react';
    import { AudioOutlined } from '@ant-design/icons';
    import { Input, Space, Empty, Row, Col, Card } from 'antd';



    const { Search } = Input;
    const { Meta } = Card;

    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: "160px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
    };

    const DEFAULT_STATE = {
        Search: [],
        totalResults: 0,
        Response: "",
    };


    type Stock= {
        ticker: string,
        name: string,
        market:string,
        locale: string,
        primary_exchange: string,
        type: string,
        active: string,
        currency_name: string,
        cik: string,
        composite_figi: string,
        share_class_figi: string,
        last_updated_utc: string
    }

    
    type StockResponse = {
        results: Stock[];
        status: string;
        request_id: string;
        count: number;
        next_url: string
    };

    const suffix = (
    <AudioOutlined
        style={{
        fontSize: 16,
        color: '#1677ff',
        }}
    />
    );
    // function to fetch data
    
    export default function Stocks() {
        const [searchTerm, setSearchTerm] = useState("");
        const [loading, setLoading] = React.useState(false);
        const [data, setData]= useState<StockResponse | null>(null);
        const listInnerRef = useRef<HTMLDivElement>(null);
        
        async function fetchStocks({ searchTerm, page = 1 }: { searchTerm: string; page?: number }) {
            let res= await fetch(`https://api.polygon.io/v3/reference/tickers?search=${searchTerm}&active=true&apiKey=AbaVaCiV5E3qPLI2442pHKdgKyujij2M&page=${page}`)
            let data= await res.json()
            setData(data);
        }
        
        // Infinite Scroll Handler
        const onSearch = async (value: string) => {
            setSearchTerm(value);
            setLoading(true);
            try {
             await fetchStocks({ searchTerm: value });
            } catch (error) {
            console.error("Error fetching stocks:", error);
            } finally {
            setLoading(false);
            }
        };

    // Scroll handler
    const onScroll = () => {
        // You can use the window.scrollY property to determine scroll position
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        // Handle load more data here if needed
        console.log("Reached bottom of page");
        }
    };

    useEffect(() => {
        // Attach event listener to window
        window.addEventListener('scroll', onScroll);
        return () => {
        // Clean up the event listener on component unmount
        window.removeEventListener('scroll', onScroll);
        };
    }, []);
    

        function renderStocks(empty?: boolean) {
            
            
            if (!data || data.status === "False" || !data.results.length) {
                return <Empty />;
            } else {
                return (
                    <Row gutter={16}>
                        {data.results.map(stock => (
                            <Col key={stock.ticker} span={6}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                >
                                    <Meta
                                        title={stock.name}
                                        description={stock.ticker}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                );
            }
        }
            return (
                <div>
                <Space direction="vertical">
                
                    <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    suffix={suffix}
                    onSearch={onSearch}
                    />
                </Space>
            
                <div ref={listInnerRef} style={{ overflowY: 'auto', maxHeight: '500px', marginTop: '20px' }}>
                    {loading && <p>Loading...</p>}
                    {renderStocks()}
                </div>
                </div>
            );
            }






    