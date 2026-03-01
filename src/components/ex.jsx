return (
        <section id="page1" className="min-h-screen relative w-full px-6 pt-56 md:pt-56"> 
            
            {/* ⭐ LAYER 1: PARTICLES (very back) ⭐ */}
            <div className="absolute inset-0 z-0 pointer-events-none">
            <ParticlesBackground />
            </div>

            {/* ⭐ LAYER 3: UI CONTENT (Z-INDEX 10) ⭐ */}
            <div className='relative z-10 mt-28 md:mt-12'>
                {/* NAME - Must be wrapped for the "from below" effect */}
                <div ref={nameWrapRef} className="overflow-hidden mb-4 md:mb-6">
                    <h1
                        className="font-serif text-white uppercase font-black text-4xl tracking-tight
                            md:text-7xl
                        "
                        style={{ fontFamily: "'Dancing Script', cursive", display: 'block' }}
                    >
                        <span ref={nameTextRef} className='inline-block'>{name}</span>
                    </h1>
                </div>

                {/* SPECIALTY - Must be wrapped for the "from below" effect */}
                <div ref={specialtyWrapRef} className="overflow-hidden mb-6 md:mb-8">
                    <div
                        className="font-sans uppercase font-semibold text-lg md:text-4xl cursor-pointer
                        relative group inline-block rounded-lg transition-all duration-300"
                        style={{fontFamily: "'Bodoni Moda', serif"}} 
                        ref={hoverRef}
                    >
                        <div 
                            className="absolute inset-0 bg-primary/20 rounded-lg 
                                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        ></div>
                        <span 
                            ref={specialtyTextRef} 
                            // Set initial color class. GSAP will animate the change.
                            className='inline-block relative z-10 text-neutral-300' 
                        >
                            {specialty}
                        </span>
                    </div>
                </div>

                
                <div ref={summaryWrapRef} className="overflow-hidden mb-16">
                    <p 
                        className="text-sm font-normal text-neutral md:text-lg leading-relaxed max-w-2xl"
                    >
                        <span ref={summaryTextRef} className='inline-block'>{summary}</span>
                    </p>
                </div>
                

                {/* CTA Button */}
                <motion.a
                    ref={ctaRef}
                    className="relative z-50 inline-block rounded-full bg-primary/90 px-5 py-3 backdrop-blur-sm text-base border border-primary/30 leading-5 font-medium text-black max-w-fit duration-300"
                    href={`mailto:${email}?subject=Hello%20from%20Your%20Portfolio&body=Hi%20Uzra,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.`}
                    style={{ 
                        pointerEvents: 'auto', 
                        cursor: 'pointer',
                        touchAction: 'manipulation' 
                    }}

                    
                    transition={{ type: "spring", stiffness: 700, damping: 20 }}
                >
                    Get In Touch
                </motion.a>
            </div>

            {/* ⭐ LAYER 2: 3D RUBIKS CUBE ⭐ */}
            <div className="relative md:absolute md:right-0 md:top-1/3 md:-translate-y-1/2 w-full md:w-[50%] h-[350px] md:h-[60%] opacity-100 z-[5] my-8 md:my-0">                
                <div
                    className="
                    absolute inset-0 
                    bg-[radial-gradient(circle_at_center,rgba(255,179,0,0.35),rgba(255,179,0,0.15)_50%,transparent_70%)]
                    blur-3xl
                    animate-pulse
                    "
                    style={{ animationDuration: '3s' }}
                />

                <div
                    className="
                    absolute inset-0 
                    bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.25),transparent_60%)]
                    blur-2xl
                    "
                />
                <div className="w-full h-full pointer-events-auto">
                    <RubiksHero3D />
                </div>
            </div>



        </section>
    );

return(
    <>
        {/* Soft base light */}
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 20, 10]} intensity={1.5} castShadow />

    <directionalLight
        position={[5, 20, 10]}
        intensity={1}
    />

    <pointLight
        position={[-10, 10, 10]}
        intensity={1}
        color="#c084fc"
    />

    <pointLight
    position={[10, 10, 10]}
    intensity={1}
    color="#f9a8d4"
    />

    <pointLight
    position={[0, 18, -10]}
    intensity={1.2}
    color="#f5d0fe"
    />

    <pointLight
    position={[-15, 10, -5]}
    intensity={0.8}
    color="#d8b4fe"
    />

    



    {/* Back Wall */}
    <mesh position={[0, 10, -30]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#e0d4ff" roughness={0.8} />
    </mesh>

    {/* Left Wall */}
    <mesh rotation={[0, Math.PI / 2, 0]} position={[-20, 10, -10]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#e9d5ff" roughness={0.8} />
    </mesh>
    <DegreeModel position={[-10,10,-28]} rotation={[0,0,0]} onClick={handleDegreeClick}/>


    {/* Right Wall */}
    <mesh rotation={[0, -Math.PI / 2, 0]} position={[20, 10, -10]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#c4b5fd" roughness={0.8} />
    </mesh>
    <ArcadeModel
        position={[2,5.5,-25]}
        rotation={[0, -Math.PI / 2,0]}
        ref={arcadeRef}
        scale={1}
        onClick={handleArcadeClick}
    />

    {/* Floor */}
    {/* Extended Floor */}
    <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-10, 0, -15]}   // shift slightly left
        receiveShadow
    >
        <planeGeometry args={[80, 80]} />   {/* bigger floor */}
        <meshStandardMaterial 
            color="#f9d5e5"
            roughness={0.9}
            metalness={0.2}
        />
    </mesh>

    {/* Outdoor Grass Patch */}
    <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-28, 0.01, -15]}   // under billboard
        receiveShadow
    >
        <planeGeometry args={[30, 40]} />
        <meshStandardMaterial 
            color="#14532d"
            roughness={1}
        />
    </mesh>



    {/* Desk Group */}
    <group position={[-17, 3, 2]} rotation={[0,Math.PI / 2,0]}>

        {/* Desk Top */}
        <mesh position={[0, 7, 0]} castShadow receiveShadow>
            <boxGeometry args={[14, 0.6, 6]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>

        {/* Under top highlight */}
        <mesh position={[0, 6.5, 0]}>
            <boxGeometry args={[14, 0.1, 6]} />
            <meshStandardMaterial color="#3a3a4a" />
        </mesh>


        {/* Left Leg */}
        <mesh position={[-6, 2, -2.5]} castShadow>
            <boxGeometry args={[0.6, 10, 0.6]} />
            <meshStandardMaterial color="#1f1f2a" />
        </mesh>

        {/* Right Leg */}
        <mesh position={[6, 2, -2.5]} castShadow>
            <boxGeometry args={[0.6, 10, 0.6]} />
            <meshStandardMaterial color="#1f1f2a" />
        </mesh>

        {/* Back Leg Left */}
        <mesh position={[-6, 2, 2.5]} castShadow>
            <boxGeometry args={[0.6, 10, 0.6]} />
            <meshStandardMaterial color="#1f1f2a" />
        </mesh>

        {/* Back Leg Right */}
        <mesh position={[6, 2, 2.5]} castShadow>
            <boxGeometry args={[0.6, 10, 0.6]} />
            <meshStandardMaterial color="#1f1f2a" />
        </mesh>

        <Laptop onClick={handleLaptopClick}/>
    </group>


    <BookShelf onClick={handleBookShelfClick} setShowSkillsHover={setShowSkillsHover}/>
    <BoardModel 
        scale={1.9}
        position={[-32, 15, 0]}
        rotation={[0,0.6,0]}
    />
    


    </>


)