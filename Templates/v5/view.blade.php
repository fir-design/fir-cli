@if(is_admin() && $hide)
<div class="pinecone--removed">
    <h3 class="h4">
        This Pinecone has been hidden from display
    </h3>
    <h4 class="h6">
        (Dont worry: This message will only show in the admin!)
    </h4>
</div>
@endif

@if($block->preview)
    {{ Fir\Lib\Utils\Helpers::loadInlineAssets() }}
@endif

@if($block->example == $block->block->data)
    <img src="https://res.cloudinary.com/fir-design/image/upload/w_1400,f_auto,q_auto/Pinecones/fir-hero3-light.png" alt="" style="width:100%;">
@else
    @if($hide)
        @if(!Fir\Lib\Utils\Helpers::isProduction())
        <!-- Description : [DESC] -->
        @endif
    @else
        <!-- Start [NAME] -->
        <fir-[SLUGIFY]  is="fir-[SLUGIFY]" 
                        data-pinecone 
                        class="@container/[SLUGIFY]"
                        {!! $options['animations']['animationsComponent'] !!}
                        id="{{ $block->block->anchor ?? Fir\Lib\Utils\Blocks::getUniqueId() }}"
        >
            <section 
                data-animation-props="{{ Fir\Lib\Utils\Animations::animationsComponentVariables($options['animations']) }}"
            >
               
                    <small>Pinecone: [NAME] / [CAMEL]</small>
                    <div data-vue>
                    </div>
                    <InnerBlocks  data-[SLUGIFY] allowedBlocks="{!! $allowed !!}"/>

            </section>
        </fir-[SLUGIFY]>
        <!-- End [NAME] -->
    @endif
@endif
