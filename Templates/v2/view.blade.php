@if(is_admin() && $hide)
    <!-- HIDDEN -->
    <div class="pinecone--removed">
        <h3 class="h4">
            This Pinecone has been hidden from display
        </h3>
        <h4 class="h6">
            (Dont worry: This message will only show in the admin!)
        </h4>
    </div>
@endif

@if($block->example == $block->block->data)
    <!-- PREVIEW -->
    @if($block->style == 'light')
        <img src="https://res.cloudinary.com/fir-design/image/upload/w_1400,f_auto,q_auto/Pinecones/fir-hero3-light.png" alt="" style="width:100%;">
    @endif

    @if($block->style == 'dark')
        <img src="https://res.cloudinary.com/fir-design/image/upload/w_1400,f_auto,q_auto/Pinecones/fir-hero3-dark.png" alt="" style="width:100%;">
    @endif

@else

    @if(!$hide)
        <!-- Start [NAME] -->
        @if(!Fir\Lib\Utils\Helpers::isProduction())
        <!-- Description : [DESC] -->
        @endif
        <fir-[SLUGIFY]  
            fir-container="[SLUGIFY]" 
            is="fir-[SLUGIFY]" 
            id="{{ $options['pinecone_id'] ?? '' }}"
            data-pinecone
        >

            <section
                class="[SLUGIFY] {{ $block->classes }} {{ $flipLayout }}"  
                style="{{ $padding }} {{ $pull }}" 
                data-title="{{ $pinecone_title ?? '' }}" 
            >
                
                    <div class="[SLUGIFY]__copy">
                        <h1 class="[SLUGIFY]__title"> {{ $title }}</h1>
                        <small>Pinecone: [NAME] / [CAMEL]</small>
                        <p class="[SLUGIFY]__text"> {{ $text }}</p>
                        <div data-vue>                
                        </div>
                        <InnerBlocks />
                    </div>

            </section>
        </fir-[SLUGIFY]>

        <!-- End [NAME] -->

    @else
        <!-- Hidden [NAME] Component -->
    @endif
@endif
